import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alliance } from 'src/app/alliance';
import { ApiService, Final24 } from 'src/app/services/api.service';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent implements OnInit {

  @Input() final24List: Final24[] = [];

  teamList: string[] = [];
  alliance:number = 0;
  teamAverage: number = 0;
  teamMedian: number = 0;
  allianceData: Alliance[] = [];

  alliance1: string = "";
  alliance4: string = "";
  alliance5: string = "";
  alliance8: string = "";
  alliance2: string = "";
  alliance7: string = "";
  alliance3: string = "";
  alliance6: string = "";

  match5r: string = "";
  match5b: string = "";
  m5r: string = "";
  m5b: string = "";

  match7r: string = "";
  match7b: string = "";
  m7r: string = "";
  m7b: string = "";

  match6r: string = "";
  match6b: string = "";
  m6r: string = "";
  m6b: string = "";

  match8r: string = "";
  match8b: string = "";
  m8r: string = "";
  m8b: string = "";

  match9r: string = "";
  match9b: string = "";
  m9r: string = "";
  m9b: string = "";
    
  match10r: string = "";
  match10b: string = "";
  m10r: string = "";
  m10b: string = "";
    
  match11r: string = "";
  match11b: string = "";
  m11r: string = "";
  m11b: string = "";

  match12r: string = "";
  match12b: string = "";
  m12r: string = "";
  m12b: string = "";
  
  match13r: string = "";
  match13b: string = "";
  m13r: string = "";
  m13b: string = "";
    
  match14r: string = "";
  match14b: string = "";
  m14r: string = "";
  m14b: string = "";



  allianceList=[[0,8,16],[1,9,17],[2,10,18],[3,11,19],[4,12,20],[5,13,21],[6,14,22],[7,15,23]];
  // data: {alliance: 1, team: {1:0, 2:8, 3:23}}

  constructor(private apiService: ApiService, private router: Router) {

    console.log("Made it here");
    // this.regenerateFilter();

  }

  ngOnInit(): void {

    
  }
  
  ngOnChanges() { 
    this.regenerateFilter();

  }



  regenerateFilter() {
    console.log("regenerateFilter");

    if (this.final24List) {
      this.alliance=1; // Position in allianceList Array
      this.allianceData = [];

      for (const x in this.allianceList) {
        let i=0; // Position in final24List Array
        let x=this.alliance -1;

        // this.final24List_filter = [];
        this.teamList = [];

        for (const f of this.final24List) {
          // console.log("Loop: " + i);

          if (this.allianceList[x].includes(i)) { 

              this.teamList.push(f.team);

          }
          i=i+1;
        }

        let workList={"alliance":this.alliance,"team1":this.teamList[0],"team2":this.teamList[1],
                      "team3":this.teamList[2],"teamAverage":0,"teamMedian":0};
        this.allianceData.push(workList);

        this.alliance=this.alliance+1;
      } 

    } else {
      console.log("No Teams List Found");
    }

    this.alliance1 = this.allianceData[0].team1 + "-" + this.allianceData[0].team2 + "-" + this.allianceData[0].team3;
    this.alliance4 = this.allianceData[3].team1 + "-" + this.allianceData[3].team2 + "-" + this.allianceData[3].team3;
    this.alliance5 = this.allianceData[4].team1 + "-" + this.allianceData[4].team2 + "-" + this.allianceData[4].team3;
    this.alliance8 = this.allianceData[7].team1 + "-" + this.allianceData[7].team2 + "-" + this.allianceData[7].team3;

    this.alliance2 = this.allianceData[1].team1 + "-" + this.allianceData[1].team2 + "-" + this.allianceData[1].team3;
    this.alliance7 = this.allianceData[6].team1 + "-" + this.allianceData[6].team2 + "-" + this.allianceData[6].team3;
    this.alliance3 = this.allianceData[2].team1 + "-" + this.allianceData[2].team2 + "-" + this.allianceData[2].team3;
    this.alliance6 = this.allianceData[5].team1 + "-" + this.allianceData[5].team2 + "-" + this.allianceData[5].team3;


  }

  setWin(match: number, outcome: number) {
    if (match == 1) {
      if (outcome == 1) {
        this.match7r = this.alliance1;
        this.match5r = this.alliance8;
        this.m7r = "1";
        this.m5r = "8";
      } else if (outcome == 2) {
        this.match7r = this.alliance8;
        this.match5r = this.alliance1;
        this.m7r = "8";
        this.m5r = "1";
      } else {
        this.match7r = "Match 1 Winner";
        this.m7r = " ";
        this.match5r = "Match 1 Loser";
        this.m5r = " ";
      }

    } else if (match == 2) {
      if (outcome == 1) {
        this.match7b = this.alliance4;
        this.match5b = this.alliance5;
        this.m7b = "4";
        this.m5b = "5";
      } else if (outcome == 2) {
        this.match7b = this.alliance5;
        this.match5b = this.alliance4;
        this.m7b = "5";
        this.m5b = "4";
      } else {
        this.match7b = "Match 2 Winner";
        this.m7b = " ";
        this.match5b = "Match 2 Loser";
        this.m5b = " ";
      }

    } else if (match == 3) {
      if (outcome == 1) {
        this.match8r = this.alliance2;
        this.match6r = this.alliance7;
        this.m8r = "2";
        this.m6r = "7";
      } else if (outcome == 2) {
        this.match8r = this.alliance7;
        this.match6r = this.alliance2;
        this.m8r = "7";
        this.m6r = "2";
      } else {
        this.match8r = "Match 3 Winner";
        this.m8r = " ";
        this.match6r = "Match 3 Loser";
        this.m6r = " ";
      }


    } else if (match == 4) {
      if (outcome == 1) {
        this.match8b = this.alliance3;
        this.match6b = this.alliance6;
        this.m8b = "3";
        this.m6b = "6";
      } else if (outcome == 2) {
        this.match8b = this.alliance6;
        this.match6b = this.alliance3;
        this.m8b = "6";
        this.m6b = "3";
      } else {
        this.match8b = "Match 4 Winner";
        this.m8b = " ";
        this.match6b = "Match 4 Loser";
        this.m6b = " ";
      }

    } else if (match == 5) {
      if (outcome == 1) {
        this.match10b = this.match5r;
        this.m10b = this.m5r;
      } else if (outcome == 2) {
        this.match10b = this.match5b;
        this.m10b = this.m5b;
      } else {
        this.match10b = "Match 5 Winner";
        this.match10b = " ";
      }

    } else if (match == 6) {
      if (outcome == 1) {
        this.match9b = this.match6r;
        this.m9b = this.m6r;
      } else if (outcome == 2) {
        this.match9b = this.match6b;
        this.m9b = this.m6b;
      } else {
        this.match9b = "Match 6 Winner";
        this.match9b = " ";
      }

    } else if (match == 7) {
      if (outcome == 1) {
        this.match11r = this.match7r;
        this.match9r = this.match7b;
        this.m11r = this.m7r;
        this.m9r = this.m7b;
      } else if (outcome == 2) {
        this.match11r = this.match7b;
        this.match9r = this.match7r;
        this.m11r = this.m7b;
        this.m9r = this.m7r;
      } else {
        this.match11r = "Match 7 Winner";
        this.m11r = " ";
        this.match9r = "Match 7 Loser";
        this.m9r = " ";
      }

    } else if (match == 8) {
      if (outcome == 1) {
        this.match11b = this.match8r;
        this.match10r = this.match8b;
        this.m11b = this.m8r;
        this.m10r = this.m8b;
      } else if (outcome == 2) {
        this.match11b = this.match8b;
        this.match10r = this.match8r;
        this.m11b = this.m8b;
        this.m10r = this.m8r;
      } else {
        this.match11b = "Match 8 Winner";
        this.m11b = " ";
        this.match10r = "Match 8 Loser";
        this.m10r = " ";
      }

    
    } else if (match == 9) {
      if (outcome == 1) {
        this.match12b = this.match9r;
        this.m12b = this.m9r;
      } else if (outcome == 2) {
        this.match12b = this.match9b;
        this.m12b = this.m9b;
      } else {
        this.match12b = "Match 9 Winner";
        this.match12b = " ";
      }
    } else if (match == 10) {
      if (outcome == 1) {
        this.match12r = this.match10r;
        this.m12r = this.m10r;
      } else if (outcome == 2) {
        this.match12r = this.match10b;
        this.m12r = this.m10b;
      } else {
        this.match12r = "Match 10 Winner";
        this.m12r = " ";
      }

    } else if (match == 11) {
      if (outcome == 1) {
        this.match14r = this.match11r;
        this.m14r = this.m11r;
        this.match13r = this.match11b;
        this.m13r = this.m11b;
      } else if (outcome == 2) {
        this.match14r = this.match11b;
        this.m14r = this.m11b;
        this.match13r = this.match11r;
        this.m13r = this.m11r;
      } else {
        this.match14r = "Match 11 Winner";
        this.m14r = " ";
        this.match13r = "Match 11 Loser";
        this.m13r = " ";
      }
    } else if (match == 12) {
      if (outcome == 1) {
        this.match13b = this.match12r;
        this.m13b = this.m12r;
      } else if (outcome == 2) {
        this.match13b = this.match12b;
        this.m13b = this.m12b;
      } else {
        this.match13b = "Match 12 Winner";
        this.m13b = " ";
      }
    } else if (match == 13) {
      if (outcome == 1) {
        this.match14b = this.match13r;
        this.m14b = this.m13r;
      } else if (outcome == 2) {
        this.match14b = this.match13b;
        this.m14b = this.m13b;
      } else {
        this.match14b = "Match 13 Winner";
        this.m14b = " ";
      }
    }


  }

}
