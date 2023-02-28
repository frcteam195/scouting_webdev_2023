import { C } from '@angular/cdk/keycodes';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, CurrTeams, Final24 } from 'src/app/services/api.service';
import { Matches } from '../../matches';

export interface TeamMatch {
  Team: string;
  matchNum: number;
}

export interface PrepMatch {
  Team: string;
  matchNum: number;
  Format: number;
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  @Input() isMobile: number; //1 = mobile, 0 = standard

  @Output() sendMatchEvent = new EventEmitter<number>();
  @Output() sendTeamEvent = new EventEmitter<string>();

  red1: string = "195";
  red2: string = "195";
  red3: string = "195";
  blue1: string = "195";
  blue2: string = "195";
  blue3: string = "195";
  matchNum: number = 1;
  hiTeam: string = "xxx";
  team: string = "All";
  watch: number = 0;
  selectedMatch: number;

  apiWatch1List: Final24[]=[];
  apiWatch2List: Final24[]=[];

  apiMatchList: Matches[];
  apiMatchList_filter: Matches[]; 
  apiCurrTeamList: CurrTeams[];

  teamMatch: TeamMatch[] = [];
  teamMatchFinal: TeamMatch[] = [];
  teamMatchFilter: TeamMatch[] = [];
  teamMatchChange: TeamMatch[] = [];

  teamHi = [""];
  moveTeam: string = "";
  moveMatch: number = 0;

  score: number = 0;
  mFilter: number = 0;

  prepTeam: PrepMatch[] = [];
  prepAll: PrepMatch[] = [];
  prepFinal: PrepMatch[] = [];

  constructor(private apiService: ApiService, private router: Router) {
    this.isMobile=0;
    this.apiMatchList = [];
    this.apiMatchList_filter = [];
    this.apiCurrTeamList = [];
    this.selectedMatch = 0;

    this.apiService.MatchReplay.subscribe(match => {
      this.apiMatchList = match;
      this.regenerateFilter();
    });

    this.apiService.CurrTeamReplay.subscribe(currteam => {
      this.apiCurrTeamList = currteam;
    });

    this.apiService.getWatch1().then(response => this.apiWatch1List = response);
    this.apiService.getWatch2().then(response => this.apiWatch2List = response);

  }

  getMatch(match: number) {
    //console.log("Made it to getMatch with [" + match + "]");
    this.matchNum=match;
    this.regenerateFilter();

  }
  teamPage(team: string) {
    //console.log("Calling Robot Page with: " + team)
    //this.router.navigateByUrl('/robot/'+team);
    if (this.isMobile == 1) {
      this.sendTeamEvent.emit(team);
    } else {
      // Opens in New Tab
      this.router.navigate([]).then(result => { window.open('#/robot/'+team, '_blank'); });
    }
  }

  matchPage(match: number) {
    //console.log("Calling Match Page with: " + match)
    //this.router.navigateByUrl('/robot/'+team);

    if (this.isMobile == 1) {
      this.sendMatchEvent.emit(match);
    } else {
      // Opens in New Tab
      this.router.navigate([]).then(result => { window.open('#/match/'+match, '_blank'); }); 
    }
   
  }


  teamSelect(team: string) {
    //console.log("Current Team: " + this.team);
    if (team == this.hiTeam) {
        this.hiTeam = "";
        //console.log("Highlight off");
    } else {
      this.hiTeam = team;
      //console.log("Highlighting Robot: " + team);
    }
  }

  
  setTeam(team: string) {
    //console.log(team);
    this.team = team;
    this.watch = 0;
    this.regenerateFilter()
  }


  setWatch(watch: number) {
    this.watch = watch;
    //this.regenerateFilter();
    if (this.watch == 4) {
      // When Partners Option selected, Show all records.
      this.matchPrep('195');
      this.hiTeam = "";
      this.mFilter = 1;
      this.team = "All";
      this.regenerateFilter();
    }

    //console.log("Run setWatch: " + watch);
  }


  getClass(team: string, match: number, color: string) {
  // Sets the highlight class for the teams on the schedule
    if (team == this.hiTeam) {
      if (color == 'R')
        return 'sortedR';
      else
        return 'sortedB';
    }
    if ((this.watch == 1) || (this.watch == 3)) {
      for (const t of this.apiWatch1List) {
        if (team == t.team) {
          return 'watch1';
        }
      }
    } 
    if ((this.watch == 2) || (this.watch == 3)) {
      for (const t of this.apiWatch2List) {
        if (team == t.team) {
          return 'watch2';
        }
      }
    }
    if (this.watch == 4) {
      for (const p of this.prepFinal) {
        if ((p.Team==team)&&(p.matchNum==match)){
          return 'bg'+p.Format;
        }
      }
    }

    if (color == 'R')
      return 'titleR';
    else
      return 'titleB';

  }



  regenerateFilter() {

    //console.log("Made it to Filter with [" + this.matchNum + "]");
    if (this.apiMatchList) {
      this.apiMatchList_filter = [];
      var teamList = [];
      for (const m of this.apiMatchList) {
        teamList=[m.red1, m.red2, m.red3, m.blue1, m.blue2, m.blue2];
        if (this.team == "All") {
          if (this.mFilter == 0) {
            if ((m.redTotalPts <= 0)||(m.redTotalPts <= 0))
              this.apiMatchList_filter.push(m);
          } else if (this.mFilter == 1) {
            this.apiMatchList_filter.push(m);
          }
          
        } 
        else if (teamList.includes(this.team))  {
          this.apiMatchList_filter.push(m);
        }
      }
      if (this.team != "All") {
        this.teamSelect(this.team);
      }  /* if (this.watch == 1)
        for (const x of this.apiWatch1List) {
          console.log("Team: " + x.Team);
          this.teamSelect(x.Team);
        } */
        
    } else {
      console.log("No Match List Found");
    }

  }

  teamList() {

    //console.log("Made it to Filter with [" + this.matchNum + "]");
    if (this.apiMatchList) {

      this.teamMatch = [];
      this.teamMatchFinal = [];
      for (const m of this.apiMatchList) {
        this.teamMatch.push({Team: m.red1, matchNum: m.matchNum});
        this.teamMatch.push({Team: m.red2, matchNum: m.matchNum});
        this.teamMatch.push({Team: m.red3, matchNum: m.matchNum});
        this.teamMatch.push({Team: m.blue1, matchNum: m.matchNum});
        this.teamMatch.push({Team: m.blue2, matchNum: m.matchNum});
        this.teamMatch.push({Team: m.blue3, matchNum: m.matchNum});
      }

    } else {
      console.log("No Match List Found");
    }
    
    //Pick by Team
    //this.teamMatch.sort((a, b) => Number(b.Team) - Number(a.Team));
    this.teamMatch.sort((a, b) => Number(a.Team) - Number(b.Team));
    var selectedTeams: any =[];
    var selectedMatches: any =[];

    for (const w of this.teamMatchChange) {
      selectedTeams.push(w.Team);
      selectedMatches.push(w.matchNum);
      this.teamMatchFinal.push(w);
    }

    for (const c of this.teamMatch) {
      //console.log("Team: " + c.Team + " matchNum: " + c.matchNum);
      if (selectedMatches.includes(c.matchNum)) {
        //console.log("Skipping Match: " + c.matchNum);
      } else if (selectedTeams.includes(c.Team)) {
          //console.log("Skipping team: " + c.Team);
      } else {
            //console.log("Team List: " + c.Team + " Match: " + c.matchNum);
            //console.log("Printing Record: " + c.matchNum + ":" + c.Team);
            this.teamMatchFinal.push(c);
            selectedTeams.push(c.Team);
            selectedMatches.push(c.matchNum);
      }
    }
    this.teamMatchFinal.sort((a, b) => a.matchNum - b.matchNum);

    this.teamMatchFilter = [];
    var i = 1;
    var j = 0;
    for (const x of this.teamMatchFinal) {
      //console.log("---------------------");
      if (x.matchNum == i) {
        //console.log("Match " + x.matchNum);
        this.teamMatchFilter.push(x);
        i = i + 1;
      } else {
        j = 0;
        while (i < x.matchNum) {
          //console.log("Blank Match " + i + " matchNum: " + x.matchNum);
          this.teamMatchFilter.push({Team: "", matchNum: i});
          i = i + 1;
        }
        //console.log("Match " + x.matchNum);
        this.teamMatchFilter.push(x);
        i = i + 1;
      }
    }

    //console.log("Teams List: " + selectedTeams);

  }


  selectMatch(match: number) {
    this.teamHi = [];
    this.moveMatch = match;
    for (const m of this.apiMatchList) {
      if (m.matchNum == match)
        {
          this.teamHi.push(m.red1);
          this.teamHi.push(m.red2);
          this.teamHi.push(m.red3);
          this.teamHi.push(m.blue1);
          this.teamHi.push(m.blue2);
          this.teamHi.push(m.blue3);
          break;
        }
    }
    //console.log("Teams for Match " + match + " [" + this.teamHi + "]");
  }

  selectTeam(team: string) {
    this.moveTeam = team;
    this.teamSelect(team);

    //console.log("Team to Hilight: [" + this.moveTeam + "]");
  }

  getTeamClass(team: string) {
    if (this.moveTeam == team) {
      return 'watch1';
    } else if (this.teamHi.includes(team)) {
      return 'watch2';
    } else {
      return 'normal';
    }
  }

  getMatchClass(match: number) {
    if (this.moveMatch == match) {
      return 'watch1';
    } else {
      return 'normal';
    }
  }

  switchTeam(team: string, match: number) {
    if ((this.moveMatch > 0) && (this.moveTeam != "")) {
      this.teamMatchChange.push({Team: this.moveTeam, matchNum: match});
      this.teamMatchChange.push({Team: team, matchNum: this.moveMatch});
      console.log("Adding ["+this.moveMatch+":"+team+"] and [" + match + ":" + this.moveTeam +"]");
    }

    this.teamList();

  }

  resetList() {
    this.teamMatchChange =[];
    this.teamList();

  }

  setMatch(ID: number){
    this.selectedMatch = ID;
    console.log(this.selectedMatch);
  }

  getScoreClass(red: number, blue: number, color: string) {
    if ((color == 'R') && (red > blue)) {
      //return 'sortedR';
      return 'watch2';
    } else if ((color == 'B') && (red < blue)) {
      //return 'sortedB';
      return 'watch2';
    }
    return 'normal';
  }


  matchFilter() {

    if (this.mFilter == 1) {
      this.mFilter = 0;
    } else {
      this.mFilter = 1;
    }
    this.regenerateFilter();
  }

  
  scoreFilter() {

    if (this.score == 1) {
      this.score = 0;
    } else {
      this.score = 1;
    }
    //this.regenerateFilter();
  }

  ngOnInit(): void {

  }

  matchPrep(team: string) {

    //console.log("Geting alliance partner data for [" + team + "]");
    if (this.apiMatchList) {

      this.teamMatch = [];

      this.prepTeam = [];
      this.prepFinal = [];
      var i=0;
      for (const m of this.apiMatchList) {

        if ((team == m.red1)||(team == m.red2)||(team == m.red3)) {
          i=i+1;
          this.prepTeam.push({Team: m.red1, matchNum: m.matchNum, Format: i});
          this.prepTeam.push({Team: m.red2, matchNum: m.matchNum, Format: i});
          this.prepTeam.push({Team: m.red3, matchNum: m.matchNum, Format: i});
        } else if ((team == m.blue1)||(team == m.blue2)||(team == m.blue3)) {
          i=i+1;
          this.prepTeam.push({Team: m.blue1, matchNum: m.matchNum, Format: i});
          this.prepTeam.push({Team: m.blue2, matchNum: m.matchNum, Format: i});
          this.prepTeam.push({Team: m.blue3, matchNum: m.matchNum, Format: i});
        }

        this.teamMatch.push({Team: m.red1, matchNum: m.matchNum});
        this.teamMatch.push({Team: m.red2, matchNum: m.matchNum});
        this.teamMatch.push({Team: m.red3, matchNum: m.matchNum});
        this.teamMatch.push({Team: m.blue1, matchNum: m.matchNum});
        this.teamMatch.push({Team: m.blue2, matchNum: m.matchNum});
        this.teamMatch.push({Team: m.blue3, matchNum: m.matchNum});        
      }

    } else {
      console.log("No Match List Found");
    }

    var selTeam;
    var selMatch;

    for (const x of this.prepTeam) {
      if (x.Team != team) {
        selTeam="";
        selMatch=0;
        for (const m of this.teamMatch) {
          if ((m.Team == x.Team)&&(m.matchNum < x.matchNum)) {
            selTeam = m.Team;
            selMatch= m.matchNum;
          }

        }
        this.prepFinal.push({Team: selTeam, matchNum: selMatch, Format: x.Format});
        //console.log("Opp: " + selTeam + " Match #: " + selMatch + " Format: " + x.Format);
      } else {
        x.Format = 0;
      }

    }

    this.prepFinal = this.prepFinal.concat(this.prepTeam);

  }

}
