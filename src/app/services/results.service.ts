import { computed, Injectable, Signal, signal } from '@angular/core';
import { pollResult } from '../models/pollresult.model';
import { Coalition } from '../models/coalition.model';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { environment } from '../../environments/environment';

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
    if (partyName === "BSW") return "#8112B4";

    return "#E8E8E8";
  }
  
  // Signals
  allPollResults = signal<pollResult[]>([]);
  selectedPollResult = signal<pollResult>(this.allPollResults()[0]);

  // Set the selected poll results
  setSelectedPollResult(id: number) {
    const pollResult = this.allPollResults().find(q => q.id === id);
    if (pollResult) {
      this.selectedPollResult.set(pollResult);
    }
  }

  // Calculate possible coaltions from poll results
  coalitions = computed(() => {
    const totalPercentage =
      (this.selectedPollResult().cducsu >= 5 ? this.selectedPollResult().cducsu : 0) +
      (this.selectedPollResult().spd >= 5 ? this.selectedPollResult().spd : 0) +
      (this.selectedPollResult().gruene >= 5 ? this.selectedPollResult().gruene : 0) +
      (this.selectedPollResult().fdp >= 5 ? this.selectedPollResult().fdp : 0) +
      (this.selectedPollResult().afd >= 5 ? this.selectedPollResult().afd : 0) +
      (this.selectedPollResult().linke >= 5 ? this.selectedPollResult().linke : 0) +
      (this.selectedPollResult().bsw >= 5 ? this.selectedPollResult().bsw : 0);
    
    const cduSeats = this.selectedPollResult().cducsu >= 5 ? Math.round((this.selectedPollResult().cducsu / totalPercentage) * 630) : 0;
    const spdSeats = this.selectedPollResult().spd >= 5 ? Math.round((this.selectedPollResult().spd / totalPercentage) * 630) : 0;
    const grueneSeats = this.selectedPollResult().gruene >= 5 ? Math.round((this.selectedPollResult().gruene / totalPercentage) * 630) : 0;
    const fdpSeats = this.selectedPollResult().fdp >= 5 ? Math.round((this.selectedPollResult().fdp / totalPercentage) * 630) : 0;
    const afdSeats = this.selectedPollResult().afd >= 5 ? Math.round((this.selectedPollResult().afd / totalPercentage) * 630) : 0;
    const linkeSeats = this.selectedPollResult().linke >= 5 ? Math.round((this.selectedPollResult().linke / totalPercentage) * 630) : 0;
    const bswSeats = this.selectedPollResult().bsw >= 5 ? Math.round((this.selectedPollResult().bsw / totalPercentage) * 630) : 0;

    let coalitions: Array<Coalition> = new Array();

    if(cduSeats > 315) {
      coalitions.push({id: "cdu", seats: cduSeats, values: [{party: "CDU/CSU", value: cduSeats}]});
    }
    if(cduSeats + afdSeats > 315) {
      coalitions.push({id: "cduafd", seats: cduSeats + afdSeats, values: [{party: "CDU/CSU", value: cduSeats}, {party: "AfD", value: afdSeats}]});
    }
    if(cduSeats + spdSeats > 315) {
      coalitions.push({id: "cduspd", seats: cduSeats + spdSeats, values: [{party: "CDU/CSU", value: cduSeats}, {party: "SPD", value: spdSeats}]});
    }
    if(cduSeats + grueneSeats > 315) {
      coalitions.push({id: "cdugruene", seats: cduSeats + grueneSeats, values: [{party: "CDU/CSU", value: cduSeats}, {party: "Grüne", value: grueneSeats}]});
    }
    if(cduSeats + spdSeats + grueneSeats > 315) {
      coalitions.push({id: "cdugruenespd", seats: cduSeats + grueneSeats + spdSeats, values: [{party: "CDU/CSU", value: cduSeats},{party: "SPD", value: spdSeats}, {party: "Grüne", value: grueneSeats}]});
    }

    return coalitions;
  });

  // Load poll results from the database
  async loadPollResults() {
    const supbaseClient = createClient(environment.supabase_url, environment.supabase_api_key);

    const { data, error } = await supbaseClient.from('pollresults').select('*').order('date', { ascending: false })
    
    if (error) throw error;

    const results = data.map(result => ({
      ...result,
      date: new Date(result.date)
    })) as pollResult[];

    this.allPollResults.set(results);
    this.selectedPollResult.set(results[0]);
  }

  constructor() {
    this.loadPollResults();
  }
}
