import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Matches } from '../../matches';


@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

 redTeam1: string = "195";
 redTeam2: string = "195";
 redTeam3: string = "195";
 blueTeam1: string = "195";
 blueTeam2: string = "195";
 blueTeam3: string = "195";
 matchNum: number = 1;
 matchString: string = "";
 display: number;

  //apiAnalysis: CEA[] = [];
  apiMatchList: Matches[] = [];  

  constructor(private apiService: ApiService, private route: ActivatedRoute) {

    this.apiService.MatchReplay.subscribe(match => {
      this.apiMatchList = match;
      this.regenerateFilter();
    });

    this.display = 0;

  }

  setDisplay(ID: number){
    this.display=ID;
  }
  
  getMatch(match: number) {
    //console.log("Made it to getMatch with [" + match + "]");
    this.matchNum=match;
    this.regenerateFilter();
  }

  regenerateFilter() {

    // console.log("Made it to Filter with [" + this.matchNum + "]");
    if (this.apiMatchList) {
      for (const m of this.apiMatchList) {
        console.log("Match: [" + m.matchNum + "], selected: [" + this.matchNum + "]");
        if (m.matchNum == this.matchNum) {
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

    this.matchNum = Number(this.route.snapshot.paramMap.get('match')|| '1');
    //this.matchNo = Number(this.matchString);
    console.log("Check Match: " + this.matchNum)
  }

}
