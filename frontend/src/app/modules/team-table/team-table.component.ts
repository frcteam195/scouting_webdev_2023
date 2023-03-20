import { Router } from '@angular/router';
import { SelectorMatcher } from '@angular/compiler';
import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import { ApiService, Final24} from '../../services/api.service'
import { Types } from 'src/app/types';
import { CEA } from '../../CEA' ;


@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.scss']
})
export class TeamTableComponent implements OnInit, OnChanges {

  @Input() teamList: Final24[];
  @Input() analysisTypeID: Number | undefined;
  @Input() sort: Number;
  @Input() focus: string;
  @Input() filter: number;

  @Output() sendTeamEvent = new EventEmitter<string>();

  apiAnalysis: CEA[] = [];
  apiAnalysis_filter: CEA[] = [];
  apiTypes: Types[] = [];
  title: String;
  team: string;
  fFlag: string;

  normalShow = false;
  baShow = true;
  pitShow = true;


  constructor(private apiService: ApiService, private router: Router) {
    this.apiAnalysis_filter = [];
    this.apiAnalysis = [];
    this.title = "Title";
    this.teamList = [];
    this.sort = 1;
    this.team = "";
    this.focus = "";
    this.filter = 0;
    this.fFlag = "N";

    // Update the filter whenever the inputting data changes
    this.apiService.CEAReplay.subscribe(analysis => {
      this.apiAnalysis = analysis;
      this.regenerateFilter();
    });

    // Get Analysis Type Info
    this.apiService.TypesReplay.subscribe(types => {
      this.apiTypes = types;
    });

  }

  ngOnInit(): void {
    //console.log("Analysis Passed to Component: " + this.analysisTypeID);
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
    //console.log("Analysis Passed to Component: " + this.analysisTypeID);

    if (this.apiAnalysis && this.apiAnalysis.length && this.teamList && this.teamList.length) {

      this.apiAnalysis_filter = [];

      if (this.analysisTypeID == 80) {
        this.normalShow = true;
        this.baShow = false;
        this.pitShow = true;
      } else if (this.analysisTypeID == 40) {
        this.normalShow = true;
        this.baShow = true;
        this.pitShow = false;
      } else {
        this.normalShow = false;
        this.baShow = true;
        this.pitShow = true;
      }

      let rcount = 0;
      for (const cea of this.apiAnalysis){
        if (cea.analysisTypeID == this.analysisTypeID) {
          rcount = 0;   // set count to 0
          this.fFlag = "N";
          for (const team of this.teamList) {
            //console.log("cea.Team: [" + cea.Team + "] Team: [" + team.Team + "]");
            if (cea.team == team.team) {
              if (this.filter == 0) {
                rcount = rcount+1;// increment count
                //team.Team = "";
                break;
              } else {
                //this.apiAnalysis_filter.push(cea);
                this.fFlag = "Y";
              }
            } 
          }
          // if count is still 0, write record if filter value is off
          // if fFlag is Y, write record if filter value is on
          if ((rcount == 0 && this.filter == 0) || (this.fFlag == "Y" && this.filter == 1)) {
            this.apiAnalysis_filter.push(cea);
            
          }
        }
      }
      // Sort Logic
      if (this.sort == 1)  {
        if (this.analysisTypeID == 80) {
          //BA Rank OPR Default Sort
          //Sort by Rank
          this.apiAnalysis_filter.sort((a, b) => a.S2V - b.S2V);
        } else if (this.analysisTypeID == 40) {
          //Pit Data Default Sort
          //Sort by Build Quality, Electrical Quality, Robot Durability
          this.apiAnalysis_filter.sort((a, b) => {
            if (a.M7V > b.M7V) return -1;
            if (a.M7V < b.M7V) return 1;
            if (a.M8V > b.M8V) return -1;
            if (a.M8V < b.M8V) return 1;
            if (a.M9V > b.M9V) return -1;
            if (a.M9V < b.M9V) return 1;
            return 0;
          });   
          this.sort = 17;
        } else {
          //Sort by Median
          this.apiAnalysis_filter.sort((a, b) => b.S2V - a.S2V);
        }
      } else if (this.sort == 3) {
        //Sort by Average (OPR for type 80)
        this.apiAnalysis_filter.sort((a, b) => b.S1V - a.S1V);
      } else if (this.sort == 11) {
        //Sort by Length (reverse)
        this.apiAnalysis_filter.sort((b, a) => b.M1V - a.M1V);
      } else if (this.sort == 12) {
        //Sort by Width (reverse)
        this.apiAnalysis_filter.sort((b, a) => b.M2V - a.M2V);
      } else if (this.sort == 13) {
        //Sort by Height (reverse)
        this.apiAnalysis_filter.sort((b, a) => b.M3V - a.M3V);
      } else if (this.sort == 14) {
        //Sort by Weight
        this.apiAnalysis_filter.sort((a, b) => b.M4V - a.M4V);
      } else if (this.sort == 15) {
        //Sort by Motor Type
        this.apiAnalysis_filter.sort((a, b) => b.M5V - a.M5V);
      } else if (this.sort == 16) {
        //Sort by Base Type
        this.apiAnalysis_filter.sort((a, b) => b.M6V - a.M6V);
      } else if (this.sort == 17) {
        //Sort by Build Quality, Electrical Quality, Robot Durability
        this.apiAnalysis_filter.sort((a, b) => {
          if (a.M7V > b.M7V) return -1;
          if (a.M7V < b.M7V) return 1;
          if (a.M8V > b.M8V) return -1;
          if (a.M8V < b.M8V) return 1;
          if (a.M9V > b.M9V) return -1;
          if (a.M9V < b.M9V) return 1;
          return 0;
        });       
      } else if (this.sort == 18) {
        //Sort by Electrical Quality, Build Quality, Robot Durability
        this.apiAnalysis_filter.sort((a, b) => {
          if (a.M8V > b.M8V) return -1;
          if (a.M8V < b.M8V) return 1;
          if (a.M7V > b.M7V) return -1;
          if (a.M7V < b.M7V) return 1;
          if (a.M9V > b.M9V) return -1;
          if (a.M9V < b.M9V) return 1;
          return 0;
        });     
      } else if (this.sort == 19) {
        //Sort by Robot Durability, Build Quality, Electrical Quality
        this.apiAnalysis_filter.sort((a, b) => {
          if (a.M9V > b.M9V) return -1;
          if (a.M9V < b.M9V) return 1;
          if (a.M7V > b.M7V) return -1;
          if (a.M7V < b.M7V) return 1;
          if (a.M8V > b.M8V) return -1;
          if (a.M8V < b.M8V) return 1;
          return 0;
        });     
        
      } else {
        //Sort by Team
        this.apiAnalysis_filter.sort((a, b) => Number(a.team) - Number(b.team));
      }


      // Lookup AnalysisType for Title and Description
      for (const type of this.apiTypes) {
        if (type.analysisTypeID == this.analysisTypeID) {
          if (type.summary != null) {
            this.title = type.analysisType + " (" + type.summary + ")";
          } else {
            this.title = type.analysisType;
          }
          
          break; 

        } 
      }

    } else {
      this.apiAnalysis_filter = [];
    }

  }

}
