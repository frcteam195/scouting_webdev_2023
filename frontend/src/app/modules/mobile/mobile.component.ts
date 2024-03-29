import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Matches } from '../../matches';
import { Meta } from '@angular/platform-browser';
import { Teams } from '../../teams';
import { CEA } from '../../CEA';


@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent implements OnInit {
  display: number;
  littleDisplay: number;
  team: string;
  analysisGroup: number = 2;
  apiTeamsList: Teams[] = [];  
  apiMatchList: Matches[] = []; 
  redTeam1: string = "195";
  redTeam2: string = "195";
  redTeam3: string = "195";
  blueTeam1: string = "195";
  blueTeam2: string = "195";
  blueTeam3: string = "195";
  matchNo: number = 1;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private meta: Meta) {
    //this.apiService.CEAReplay.subscribe((analysis) => (this.apiAnalysis = analysis));
    this.apiService.TeamsReplay.subscribe((Teams) => (this.apiTeamsList = Teams));

    // Get Match Data
    this.apiService.MatchReplay.subscribe(match => {
      this.apiMatchList = match;
      this.regenerateFilter();
    });


    this.team="195";
    this.display=0;
    this.littleDisplay=1;
    this.meta.addTags([{name: 'viewport', content: 'width=device-width, initial-scale=1'}])
   }

   setTeam(team: string) {
    console.log(team);
    this.team = team;
  }

  setLittleDisplay(ID: number){
    this.littleDisplay=ID;
  }

  setDisplay(ID: number){
    this.display=ID;
  }
  
  getMatch(match: number) {
    //console.log("Made it to getMatch with [" + match + "]");
    this.matchNo=match;
    this.regenerateFilter();

  }

  openMatch(match: number) {
    this.setDisplay(2);
    this.getMatch(match);
  }

  openTeam(team: string) {
    this.setDisplay(1);
    this.setTeam(team);
  }

  regenerateFilter() {

    //console.log("Made it to Filter with [" + this.matchNo + "]");
    if (this.apiMatchList) {
      for (const m of this.apiMatchList) {
        //console.log("Match: [" + m.MatchNo + "], selected: [" + this.match + "]");
        if (m.matchNum == this.matchNo) {
          this.redTeam1 = m.red1;
          this.redTeam2 = m.red2;
          this.redTeam3 = m.red3;
          this.blueTeam1 = m.blue1;
          this.blueTeam2 = m.blue2;
          this.blueTeam3 = m.blue3;
          break;
        }
      }
    } else {
      console.log("Match List Not Found");
    }

  }
  ngOnInit(): void {
    this.team = this.route.snapshot.paramMap.get('team') || '';
    console.log("Check Robot: " + this.team)
  }

}
