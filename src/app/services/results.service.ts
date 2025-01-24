import { computed, Injectable, Signal, signal } from '@angular/core';
import { Quelle } from '../models/quellen.model';
import { PartyValue } from '../models/partyvalue.model';
import { Coalition } from '../models/coalition.model';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  getPartyColor(partyName: string): string {
    if (partyName === "CDU/CSU") return "#121212";
    if (partyName === "SPD") return "#e3000f";
    if (partyName === "Grüne") return "#005437";
    if (partyName === "FDP") return "#ffe209";
    if (partyName === "AfD") return "#009ee0";
    if (partyName === "BSW") return "#8112B4";

    return "#E8E8E8";
  }
  
  quellen = signal<Quelle[]>([
    {
      id: 1,
      name: "Forsa",
      datum: new Date('2025-01-21'),
      cducsu: 31,
      spd: 16,
      gruene: 13,
      fdp: 4,
      afd: 19,
      linke: 3,
      bsw: 4,
      sonstige: 10
    },
    {
      id: 2,
      name: "Infratest dimap",
      datum: new Date('2025-01-09'),
      cducsu: 31,
      spd: 15,
      gruene: 14,
      fdp: 4,
      afd: 20,
      linke: 4,
      bsw: 5,
      sonstige: 7
    },
    {
      id: 3,
      name: "INSA",
      datum: new Date('2025-01-20'),
      cducsu: 29,
      spd: 16,
      gruene: 13,
      fdp: 5,
      afd: 21.5,
      linke: 4,
      bsw: 7,
      sonstige: 4.5
    },
    {
      id: 4,
      name: "Froschungsgruppe Wahlen",
      datum: new Date('2025-01-10'),
      cducsu: 30,
      spd: 14,
      gruene: 15,
      fdp: 4,
      afd: 21,
      linke: 4,
      bsw: 4,
      sonstige: 8
    },
    {
      id: 5,
      name: "YouGov",
      datum: new Date('2025-01-22'),
      cducsu: 28,
      spd: 19,
      gruene: 15,
      fdp: 4,
      afd: 19,
      linke: 4,
      bsw: 6,
      sonstige: 6
    },
    {
      id: 6,
      name: "GMS",
      datum: new Date('2025-01-03'),
      cducsu: 33,
      spd: 16,
      gruene: 13,
      fdp: 4,
      afd: 18,
      linke: 3,
      bsw: 4,
      sonstige: 9
    }
  ]);

  selectedQuelle = signal<Quelle>(this.quellen()[0]);

  setSelectedQuelle(quelleId: number) {
    const quelle = this.quellen().find(q => q.id === quelleId);
    if (quelle) {
      this.selectedQuelle.set(quelle);
    }
  }

  coalitions = computed(() => {
    const totalPercentage =
      (this.selectedQuelle().cducsu >= 5 ? this.selectedQuelle().cducsu : 0) +
      (this.selectedQuelle().spd >= 5 ? this.selectedQuelle().spd : 0) +
      (this.selectedQuelle().gruene >= 5 ? this.selectedQuelle().gruene : 0) +
      (this.selectedQuelle().fdp >= 5 ? this.selectedQuelle().fdp : 0) +
      (this.selectedQuelle().afd >= 5 ? this.selectedQuelle().afd : 0) +
      (this.selectedQuelle().linke >= 5 ? this.selectedQuelle().linke : 0) +
      (this.selectedQuelle().bsw >= 5 ? this.selectedQuelle().bsw : 0);
    
    const cduSeats = this.selectedQuelle().cducsu >= 5 ? Math.round((this.selectedQuelle().cducsu / totalPercentage) * 630) : 0;
    const spdSeats = this.selectedQuelle().spd >= 5 ? Math.round((this.selectedQuelle().spd / totalPercentage) * 630) : 0;
    const grueneSeats = this.selectedQuelle().gruene >= 5 ? Math.round((this.selectedQuelle().gruene / totalPercentage) * 630) : 0;
    const fdpSeats = this.selectedQuelle().fdp >= 5 ? Math.round((this.selectedQuelle().fdp / totalPercentage) * 630) : 0;
    const afdSeats = this.selectedQuelle().afd >= 5 ? Math.round((this.selectedQuelle().afd / totalPercentage) * 630) : 0;
    const linkeSeats = this.selectedQuelle().linke >= 5 ? Math.round((this.selectedQuelle().linke / totalPercentage) * 630) : 0;
    const bswSeats = this.selectedQuelle().bsw >= 5 ? Math.round((this.selectedQuelle().bsw / totalPercentage) * 630) : 0;

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

  constructor() {
    this.quellen.set([...this.quellen()].sort((a, b) => b.datum.getTime() - a.datum.getTime()));
    this.selectedQuelle.set(this.quellen()[0]);
  }
}
