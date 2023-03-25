import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Types } from '../../types';
import { CEA } from '../../CEA';
import { Teams } from '../../teams';

@Component({
  selector: 'app-analysis-table',
  templateUrl: './analysis-table.component.html',
  styleUrls: ['./analysis-table.component.scss']
})
export class AnalysisTableComponent implements OnInit {


  @Input() selectedTeam: string;
  @Input() analysisGroup: number;
  @Input() color: number;


  apiAnalysis: CEA[] = [];
  apiAnalysis_filter: CEA[] = [];
  apiTypes: Types[] = [];
  title: String;
  titleShow = true;
  barShow = true;
  url: string = "";
  apiTeamsList: Teams[] = [];
  length: Number = 0;
  width: Number = 0;
  height: Number = 0;
  driveType: String="";
  


  constructor(private apiService: ApiService, private router: Router) {
    this.apiAnalysis_filter = [];
    this.apiAnalysis = [];
    this.title = "Title";
    this.selectedTeam = "";
    this.analysisGroup = 0;
    this.color = 0;

    // Update the filter whenever the inputting data changes
    this.apiService.CEAReplay.subscribe(analysis => {
      this.apiAnalysis = analysis;
      this.regenerateFilter();
    });
    this.apiService.TypesReplay.subscribe(types => {
      this.apiTypes = types
    });
    this.apiService.TeamsReplay.subscribe(Teams => (
      this.apiTeamsList = Teams
    ));

    this.getPitData();
    
  }

  ngOnInit(): void {
    //console.log("ngOnInit: Team Passed to Component: " + this.selectedTeam);
    //this.regenerateFilter();
  }

  ngOnChanges() { 
    this.regenerateFilter();
    this.getPitData();
  }

  teamPage(team: string) {
    //console.log("Calling Robot Page with: " + team)
    //this.router.navigateByUrl('/robot/'+team);
    // Opens in New Tab
    this.router.navigate([]).then(result => { window.open('#/robot/'+team, '_blank'); }); 
  }

  getPitData() {

    for(const t of this.apiTeamsList){
        if(t.team == this.selectedTeam) {
          this.length = t.robotLength;
          this.width = t.robotWidth;
          this.height = t.robotHeight;
          this.driveType = t.driveBaseType;

        }
      }

  }

  regenerateFilter() {
    //console.log("regenerateFilter: Analysis Passed to Component: " + this.selectedTeam);

    if (this.apiAnalysis) {

      this.apiAnalysis_filter = [];
      let analysisTypes: number[] = [];
      let i = 0;

      if (this.analysisGroup == 1) {              // Match Report
        this.apiTypes.sort((a, b) => a.matchReport - b.matchReport);
        for(const m of this.apiTypes){
          if(m.matchReport>0){
            //console.log("I love Harish [" + m.analysisTypeID + "],[" + m.analysisType + "],[" + m.matchReport + "]");
            analysisTypes[i]=m.analysisTypeID;
            i++;
          }
        }
        
      } else if (this.analysisGroup == 2) {      // Robot Snapshot 1st/top
        this.apiTypes.sort((a, b) => a.sortOrder - b.sortOrder);
        for(const m of this.apiTypes){
          if(m.robotSnapshot==1){
            analysisTypes[i]=m.analysisTypeID;
            i++;
          }
        }
      } else if (this.analysisGroup == 3) {      // Robot Snapshot 2nd
        for(const m of this.apiTypes){
          if(m.robotSnapshot==2){
            analysisTypes[i]=m.analysisTypeID;
            i++;
          }
        }
      } else if (this.analysisGroup == 4) {       // Robot Snapshot 3rd
        for(const m of this.apiTypes){
          if(m.robotSnapshot==3){
            analysisTypes[i]=m.analysisTypeID;
            i++;
          }
        }
      } else if (this.analysisGroup == 5) {       // Robot Snapshot 4th
        for(const m of this.apiTypes){
          if(m.robotSnapshot==4){
            analysisTypes[i]=m.analysisTypeID;
            i++;
          }
        }
      } else {                                  // Robot Snapshot 5th/bottom
        for(const m of this.apiTypes){
          if(m.robotSnapshot==5){
            analysisTypes[i]=m.analysisTypeID;
            i++;
          } 
        }
      }
      // Only show split bars when 
      if (this.color > 0) {
        this.titleShow = false;
        if (this.analysisGroup == 1){
          this.barShow = false;
        }
      }

      //console.log("analysisTypes: " + analysisTypes);

      // Sort Analysis Type data based on the Sort on analysisTypes
      this.apiAnalysis.sort((a, b) => analysisTypes.indexOf(a.analysisTypeID) - analysisTypes.indexOf(b.analysisTypeID));
      
      // Filter
      var url;
      let rcount = 0;
      for (const cea of this.apiAnalysis){
        if (cea.team == this.selectedTeam) {
          if (analysisTypes.includes(cea.analysisTypeID)) {
            
            if (cea.analysisTypeID == 70 ) {
             //messageText = "<a href='http://www.google.com'>Open Google</a>"
             //this.url = "<a href='http://www.google.com'>Open Google</a>";
             //url = "<a href='C:/ck/video/"+cea.Match1Display+".mp4'>"+cea.Match1Display+"</a>";
              //cea.Match4Display = this.url;
            }
            //console.log("Analysis Type: [" + cea.analysisType + "]");
            this.apiAnalysis_filter.push(cea);
          }
         }
       } 
    } else {
      this.apiAnalysis_filter = [];
    }
  }

}