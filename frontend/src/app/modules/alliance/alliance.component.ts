import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CEA } from 'src/app/CEA';
import { Alliance } from 'src/app/alliance';
import { ApiService, Final24 } from 'src/app/services/api.service';
import { Types } from 'src/app/types';

@Component({
  selector: 'app-alliance',
  templateUrl: './alliance.component.html',
  styleUrls: ['./alliance.component.scss']
})
export class AllianceComponent implements OnInit {

  @Input() analysisTypeID: number = 0;
  @Input() final24List: Final24[] = [];
  @Input() sort: number;

  final24List_filter: Final24[] = [];
  apiAnalysis: CEA[] = [];
  teamList: string[] = [];
  alliance:number = 0;
  teamAverage: number = 0;
  teamMedian: number = 0;
  allianceData: Alliance[] = [];
  apiTypes: Types[] = [];


  allianceList=[[0,8,16],[1,9,17],[2,10,18],[3,11,19],[4,12,20],[5,13,21],[6,14,22],[7,15,23]];
  // data: {alliance: 1, team: {1:0, 2:8, 3:23}}

  constructor(private apiService: ApiService, private router: Router) {

    this.sort = 1;

    this.apiService.CEAReplay.subscribe(analysis => {
      this.apiAnalysis = analysis;
      this.regenerateFilter();
    });

    this.apiService.TypesReplay.subscribe(types => {
      this.apiTypes = types
    });

    console.log("Made it here");
    // this.regenerateFilter();

  }

  ngOnInit(): void {

    
  }
  
  ngOnChanges() { 
    this.regenerateFilter();

  }


  localSort(type: number) {
    //console.log("Local Sort Type: " + type)
    this.sort = type;
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

        // Get Average and Median Totals for Alliance
        this.getSummaryData();

        let workList={"alliance":this.alliance,"team1":this.teamList[0],"team2":this.teamList[1],
                      "team3":this.teamList[2],"teamAverage":this.teamAverage,"teamMedian":this.teamMedian} ;
        this.allianceData.push(workList);

        this.alliance=this.alliance+1;
      } 

    } else {
      console.log("No Teams List Found");
    }
    this.sortData();
    
  }


  getSummaryData() {
    console.log("regenerateFilter");
    this.teamAverage = 0;
    this.teamMedian = 0;

    if (this.apiAnalysis) {

      for (const a of this.apiAnalysis) {
        // console.log("Loop: " + i);
        if (a.analysisTypeID == this.analysisTypeID) {
          // console.log("Filter: ", this.final24List_filter);

          if (this.teamList.includes(a.team)) { 

            this.teamAverage = this.teamAverage + a.S1V;
            this.teamMedian = this.teamMedian + a.S2V;

          }
        }
      } 
    } else {
      console.log("No Analysis Type Data Found");
    }
  }

  sortData() {

    if (this.sort == 1) {
      //Sort by Median
      this.allianceData.sort((a, b) => b.teamMedian - a.teamMedian);

    } else if (this.sort == 3) {
      
      //Sort by Average 
      this.allianceData.sort((a, b) => b.teamAverage - a.teamAverage);

    } else {

      //Sort by Median
      this.allianceData.sort((a, b) => a.alliance - b.alliance);

    }
    
  }

}
