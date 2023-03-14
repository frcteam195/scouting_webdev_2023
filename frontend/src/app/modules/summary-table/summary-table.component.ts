import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, Final24 } from 'src/app/services/api.service';
import { Summary } from '../../summary';

@Component({
  selector: 'app-summary-table',
  templateUrl: './summary-table.component.html',
  styleUrls: ['./summary-table.component.scss']
})
export class SummaryTableComponent implements OnInit {

  @Input() teamList: Final24[];
  @Input() sort: Number;
  @Input() focus: string;
  @Input() filter: number;

  @Output() sendTeamEvent = new EventEmitter<string>();

  apiSummary: Summary[] = []
  apiSummary_filter: Summary[] = [];
  title: string;
  team: string;
  graphData: any[];
  fFlag: string;
  sortType: number;


  selectedTeam: string;

  constructor(private apiService: ApiService, private router: Router) {    

    this.apiSummary_filter = [];
    this.apiSummary = [];
    this.selectedTeam = "";
    this.team = "";
    this.graphData = [];
    this.fFlag="N"
    this.teamList = [];
    this.filter = 0;
    this.sortType = 1;
    this.title = "Summary Graph Median";
    this.sort = 1;
    this.focus = "";

    // Update the filter whenever the inputting data changes
      this.apiService.SummaryReplay.subscribe(summary => {
      this.apiSummary = summary;
      this.regenerateFilter();
    });
  }
  

  changeSort(view: number) {
    if (view == 1) {
      this.sortType = 2;
      this.title = "Summary Table Mean"
    } else {
      this.sortType = 1;
      this.title = "Summary Table Median"
    }
    this.regenerateFilter();
  }

  ngOnChanges() {
    this.regenerateFilter();
    this.teamSelect(this.focus);
  }
  

  localSort(type: number) {
    //console.log("Local Sort Type: " + type)
    this.sort = type;
    this.regenerateFilter();
  }

  teamPage(team: string) {
    //console.log("Calling Robot Page with: " + team)
    //this.router.navigateByUrl('/robot/'+team);
    // Opens in New Tab
    this.router.navigate([]).then(result => { window.open('#/robot/'+team, '_blank'); }); 
  }

  teamSelect(team: string) {
    //console.log("Current Team: " + this.team);
    if (team == this.team) {
        //this.team = "";
        //console.log("Highlight off");
    } else {
      this.team = team;
      //console.log("Highlighting Robot: " + team);
    }
    
    // Send team back to parent component
    this.sendTeamEvent.emit(this.team);
    
  }


  
  regenerateFilter() {
    //console.log("regenerateFilter: Analysis Passed to Component: " + this.selectedTeam);
    
  if (this.apiSummary) {

    this.apiSummary_filter = [];
    
    let rcount = 0;
    for (const summ of this.apiSummary)
    {
      rcount = 0;   // set count to 0
      this.fFlag = "N";
      for (const team of this.teamList) {
        //console.log("cea.Team: [" + cea.Team + "] Team: [" + team.Team + "]");
        if (summ.team == team.team) {
          if (this.filter == 0) {
            rcount = rcount+1;// increment count
            //console.log("Don't Pick Team: " + team.Team);
            break;
          } else {
            //console.log("Pick Team: " + team.Team);
            this.fFlag = "Y";
          }
        }
      }
      if ((rcount == 0 && this.filter == 0) || (this.fFlag == "Y" && this.filter == 1)) {
          //console.log("Print Record for: "+summ.Team);
        /*  if (this.sortType == 1) {
            console.log("Mean");
          summ.AutonomousMedian = summ.AutonomousMean
          summ.AutonomousScoreMedian = summ.AutonomousScoreMean
          summ.TeleLowBallsMedian = summ.TeleLowBallsMean
          summ.TeleHighBallsMedian = summ.TeleHighBallsMean
          summ.TeleTotalBallsMedian = summ.TeleTotalBallsMean
          summ.TeleBallScoreMedian = summ.TeleBallScoreMean
          summ.TotalBallsMedian = summ.TotalBallsMedian
          summ.ClimbMedian = summ.ClimbMean
          summ.TotalScoreMedian = summ.TotalScoreMean 
          }
          else if (this.sortType == 2 ){
            console.log("Median");
           /* summ.AutonomousMedian = summ.AutonomousMedian
            summ.AutonomousScoreMedian = summ.AutonomousScoreMedian
            summ.TeleLowBallsMedian = summ.TeleLowBallsMedian
            summ.TeleHighBallsMedian = summ.TeleHighBallsMedian
            summ.TeleTotalBallsMedian = summ.TeleTotalBallsMedian
            summ.TeleBallScoreMedian = summ.TeleBallScoreMedian
            summ.TotalBallsMedian = summ.TotalBallsMedian
            summ.ClimbMedian = summ.ClimbMedian
            summ.TotalScoreMedian = summ.TotalScoreMedian 
          }*/
          this.apiSummary_filter.push(summ);
      }
    }
    console.log(this.sortType);
      // Sort Logic
      if (this.sortType == 2) {
        console.log(this.sort);
        if (this.sort == 2) {
          //Sort by Team Number
          this.apiSummary_filter.sort((a, b) => Number(a.team) - Number(b.team));
        } else if (this.sort == 3) {
          //Sort by Auto
          this.apiSummary_filter.sort((a, b) => b.autoGamePiecesMean - a.autoGamePiecesMean);
        } else if (this.sort == 4) {
          //Sort by Auto Score
          this.apiSummary_filter.sort((a, b) => b.autoRampMean - a.autoRampMean);
        } else if (this.sort == 5) {
          //Sort by Auto
          this.apiSummary_filter.sort((a, b) => b.autoScoreMean - a.autoScoreMean);
        } else if (this.sort == 6) {
          //Sort by Auto
          this.apiSummary_filter.sort((a, b) => b.rampMean - a.rampMean);
        } else if (this.sort == 7) {
          //Sort by Auto
          this.apiSummary_filter.sort((a, b) => b.teleCommunityMean - a.teleCommunityMean);
        } else if (this.sort == 8) {
          //Sort by Auto
          this.apiSummary_filter.sort((a, b) => b.teleHighMean - a.teleHighMean);
        } else if (this.sort == 9) {
          //Sort by Auto
          this.apiSummary_filter.sort((a, b) => b.teleLZPickupMean - a.teleLZPickupMean);
        } else if (this.sort == 10) {
          //Sort by Auto
          this.apiSummary_filter.sort((a, b) => b.teleLowMean - a.teleLowMean);
        } else if (this.sort == 11) {
          //Sort by Auto
          this.apiSummary_filter.sort((a, b) => b.teleMidMean - a.teleMidMean);
        } else if (this.sort == 1) {
          //Sort by Auto
          this.apiSummary_filter.sort((a, b) => b.totalScoreMean - a.totalScoreMean);
        } else if (this.sort == 12)  {
          //Total Score Sort
          this.apiSummary_filter.sort((a, b) => b.teleTotalMean - a.teleTotalMean);
        }
      } else if(this.sortType == 1) {
        if (this.sort == 2) {
          //Sort by Team Number
          this.apiSummary_filter.sort((a, b) => Number(a.team) - Number(b.team));
        } else if (this.sort == 3) {
          //Sort by Auto
          this.apiSummary_filter.sort((a, b) => b.autoGamePiecesMedian - a.autoGamePiecesMedian);
        } else if (this.sort == 4) {
          //Sort by Auto Score
          this.apiSummary_filter.sort((a, b) => b.autoRampMedian - a.autoRampMedian);
        } else if (this.sort == 5) {
          //Sort by Auto
          this.apiSummary_filter.sort((a, b) => b.autoScoreMedian - a.autoScoreMedian);
        } else if (this.sort == 6) {
          //Sort by Auto
          this.apiSummary_filter.sort((a, b) => b.rampMedian - a.rampMedian);
        } else if (this.sort == 7) {
          //Sort by Auto
          this.apiSummary_filter.sort((a, b) => b.teleCommunityMedian - a.teleCommunityMedian);
        } else if (this.sort == 8) {
          //Sort by Auto
          this.apiSummary_filter.sort((a, b) => b.teleHighMedian - a.teleHighMedian);
        } else if (this.sort == 9) {
          //Sort by Auto
          this.apiSummary_filter.sort((a, b) => b.teleLZPickupMedian - a.teleLZPickupMedian);
        } else if (this.sort == 10) {
          //Sort by Auto
          this.apiSummary_filter.sort((a, b) => b.teleLowMedian - a.teleLowMedian);
        } else if (this.sort == 11) {
          //Sort by Auto
          this.apiSummary_filter.sort((a, b) => b.teleMidMedian - a.teleMidMedian);
        } else if (this.sort == 1) {
          //Sort by Auto
          this.apiSummary_filter.sort((a, b) => b.totalScoreMedian - a.totalScoreMedian);
        } else if (this.sort == 12)  {
          //Total Score Sort
          this.apiSummary_filter.sort((a, b) => b.teleTotalMedian - a.teleTotalMedian);
        }
      }

    } else {
    this.apiSummary_filter = [];
  }
}
  
  ngOnInit(): void {
    }

}