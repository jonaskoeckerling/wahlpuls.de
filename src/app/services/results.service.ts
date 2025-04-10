import { computed, Injectable, Signal, signal } from '@angular/core';
import { PollResult } from '../models/pollresult.model';
import { Coalition } from '../models/coalition.model';
import { createClient } from '@supabase/supabase-js'
import { environment } from '../../environments/environment';
import { Source } from '../models/source.model';

// Make available in all components
@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  // Get the party color for a given party name
  getPartyColor(partyName: string): string {
    if (partyName === "CDU/CSU") return "#121212";
    if (partyName === "SPD") return "#e3000f";
    if (partyName === "Grüne") return "#005437";
    if (partyName === "FDP") return "#ffe209";
    if (partyName === "AfD") return "#009ee0";
    if (partyName === "Linke") return "#F00";
    if (partyName === "BSW") return "#8112B4";

    return "#E8E8E8";
  }

  // Signals for sources with all poll results, where first poll result is the newest one
  allSources = signal<Source[]>([]);
  selectedSource = signal<Source>(this.allSources()[0]);

  // Set the selected poll results
  setSelectedSource(source: Source) {
    this.selectedSource.set(source);
  }

  // Calculate possible coaltions from poll results
  coalitions = computed(() => {
    const totalPercentage =
      (this.selectedSource().pollResults[0].cducsu >= 5 ? this.selectedSource().pollResults[0].cducsu : 0) +
      (this.selectedSource().pollResults[0].spd >= 5 ? this.selectedSource().pollResults[0].spd : 0) +
      (this.selectedSource().pollResults[0].gruene >= 5 ? this.selectedSource().pollResults[0].gruene : 0) +
      (this.selectedSource().pollResults[0].fdp >= 5 ? this.selectedSource().pollResults[0].fdp : 0) +
      (this.selectedSource().pollResults[0].afd >= 5 ? this.selectedSource().pollResults[0].afd : 0) +
      (this.selectedSource().pollResults[0].linke >= 5 ? this.selectedSource().pollResults[0].linke : 0) +
      (this.selectedSource().pollResults[0].bsw >= 5 ? this.selectedSource().pollResults[0].bsw : 0);

    const cduSeats = this.selectedSource().pollResults[0].cducsu >= 5 ? Math.round((this.selectedSource().pollResults[0].cducsu / totalPercentage) * 630) : 0;
    const spdSeats = this.selectedSource().pollResults[0].spd >= 5 ? Math.round((this.selectedSource().pollResults[0].spd / totalPercentage) * 630) : 0;
    const grueneSeats = this.selectedSource().pollResults[0].gruene >= 5 ? Math.round((this.selectedSource().pollResults[0].gruene / totalPercentage) * 630) : 0;
    const fdpSeats = this.selectedSource().pollResults[0].fdp >= 5 ? Math.round((this.selectedSource().pollResults[0].fdp / totalPercentage) * 630) : 0;
    const afdSeats = this.selectedSource().pollResults[0].afd >= 5 ? Math.round((this.selectedSource().pollResults[0].afd / totalPercentage) * 630) : 0;
    const linkeSeats = this.selectedSource().pollResults[0].linke >= 5 ? Math.round((this.selectedSource().pollResults[0].linke / totalPercentage) * 630) : 0;
    const bswSeats = this.selectedSource().pollResults[0].bsw >= 5 ? Math.round((this.selectedSource().pollResults[0].bsw / totalPercentage) * 630) : 0;

    let coalitions: Array<Coalition> = new Array();

    // Nur CDU
    if (cduSeats > 316) {
      coalitions.push({ id: "cdu", seats: cduSeats, values: [{ party: "CDU/CSU", value: cduSeats }] });
    }

    // CDU + SPD
    if (cduSeats + spdSeats > 316) {
      coalitions.push({ id: "cduspd", seats: cduSeats + spdSeats, values: [{ party: "CDU/CSU", value: cduSeats }, { party: "SPD", value: spdSeats }] });
      // CDU + SPD + Grüne
    } else if (cduSeats + spdSeats + grueneSeats > 315) {
      coalitions.push({ id: "cdugruenespd", seats: cduSeats + grueneSeats + spdSeats, values: [{ party: "CDU/CSU", value: cduSeats }, { party: "SPD", value: spdSeats }, { party: "Grüne", value: grueneSeats }] });
    }

    // CDU + Grüne
    if (cduSeats + grueneSeats > 316) {
      coalitions.push({ id: "cdugruene", seats: cduSeats + grueneSeats, values: [{ party: "CDU/CSU", value: cduSeats }, { party: "Grüne", value: grueneSeats }] });
    }

    // CDU + AfD
    if (cduSeats + afdSeats > 316) {
      coalitions.push({ id: "cduafd", seats: cduSeats + afdSeats, values: [{ party: "CDU/CSU", value: cduSeats }, { party: "AfD", value: afdSeats }] });
      // CDU + AfD + FDP
    } else if (cduSeats + afdSeats + fdpSeats > 316) {
      coalitions.push({ id: "cduafdfdp", seats: cduSeats + afdSeats + fdpSeats, values: [{ party: "CDU/CSU", value: cduSeats }, { party: "AfD", value: afdSeats }, { party: "FDP", value: fdpSeats }] });
    }

    // SPD + Grüne
    if (spdSeats + grueneSeats > 316) {
      coalitions.push({ id: "spdgruene", seats: spdSeats + grueneSeats, values: [{ party: "SPD", value: spdSeats }, { party: "Grüne", value: grueneSeats }] });
      // SPD + Grüne + Linke
    } else if (spdSeats + grueneSeats + linkeSeats > 316) {
      coalitions.push({ id: "spdgruenelinke", seats: spdSeats + grueneSeats + linkeSeats, values: [{ party: "SPD", value: spdSeats }, { party: "Grüne", value: grueneSeats }, { party: "Linke", value: linkeSeats }] });
    }

    return coalitions;
  });

  // Signal for loading state
  isDataAvailable: Signal<boolean> = computed(() => this.allSources().length > 0);

  // Load poll results from the database
  async loadPollResults() {
    // Init the supabase client
    const supbaseClient = createClient(environment.supabase_url, environment.supabase_api_key);

    // Request the results from the last 4 years
    const fourYearsAgo = new Date();
    fourYearsAgo.setFullYear(fourYearsAgo.getFullYear() - 4);
    const { data, error } = await supbaseClient
      .from('pollresults')
      .select('*')
      .gte('date', fourYearsAgo.toISOString())
      .order('date', { ascending: false });

    // Error handling
    if (error) throw error;

    // Group and transform data
    const sourcesMap = data.reduce((accumulator: Record<string, Source>, currentRow) => {
      // Create poll result
      const pollResult: PollResult = {
        date: new Date(currentRow.date),
        cducsu: currentRow.cducsu,
        spd: currentRow.spd,
        gruene: currentRow.gruene,
        fdp: currentRow.fdp,
        afd: currentRow.afd,
        linke: currentRow.linke,
        bsw: currentRow.bsw,
        sonstige: currentRow.sonstige,
      };

      // Create new source if it doesn't exist in the accumulator
      if (!accumulator[currentRow.source]) {
        accumulator[currentRow.source] = {
          name: currentRow.source,
          pollResults: [],
        };
      }

      // Add poll result to the source's array
      accumulator[currentRow.source].pollResults.push(pollResult);
      return accumulator;
    }, {} as Record<string, Source>);

    // Convert map to array set in signal
    this.allSources.set(Object.values(sourcesMap));

    // Set first source as selected source 
    this.selectedSource.set(this.allSources()[0]);
  }

  constructor() {
    this.loadPollResults();
  }
}
