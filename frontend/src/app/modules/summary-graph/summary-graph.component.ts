import { Component, OnInit, Input } from '@angular/core';
import { ApiService, Final24 } from 'src/app/services/api.service';
import { Summary } from '../../summary';

@Component({
  selector: 'app-summary-graph',
  templateUrl: './summary-graph.component.html',
  styleUrls: ['./summary-graph.component.scss']
})
export class SummaryGraphComponent implements OnInit {

  @Input() teamList: Final24[];
  @Input() filter: number;

  apiSummary: Summary[] = []
  apiSummary_filter: Summary[] = [];
  title: string;
  team: string;
  graphData: any[];
  fFlag: string;
  sortType: number;


  public graph = {
    data: [{ x: ["195","230","181"], y: [4,3,2], type: 'bar', name: 'Auto'},
    { x: ["195","230","181"], y: [32,21,18], type: 'bar', name: 'Tele'},
    { x: ["195","230","181"], y: [15,15,10], type: 'bar', name: 'Climb'}],
    layout: {width: 1000, height: 360, barmode: 'stack', xaxis: { type: 'category' }, title: 'Summary Graph Mean'}
  };

  selectedTeam: string;

  chartOptions: { series: { name: string; data: number[]; }[]; chart: { type: string; height: number; stacked: boolean; toolbar: { show: boolean; }; zoom: { enabled: boolean; }; }; responsive: { breakpoint: number; options: { legend: { position: string; offsetX: number; offsetY: number; }; }; }[]; plotOptions: { bar: { horizontal: boolean; }; }; xaxis: { type: string; categories: string[]; }; legend: { position: string; offsetY: number; }; fill: { opacity: number; }; } | undefined;

  constructor(private apiService: ApiService) {    

    this.apiSummary_filter = [];
    this.apiSummary = [];
    this.selectedTeam = "";
    this.team = "195";
    this.graphData = [];
    this.fFlag="N"
    this.teamList = [];
    this.filter = 0;
    this.sortType = 1;
    this.title = " Median";

    // Update the filter whenever the inputting data changes
      this.apiService.SummaryReplay.subscribe(summary => {
      this.apiSummary = summary;
      this.regenerateFilter();
    });
  }

  changeSort(view: number) {
    if (view == 1) {
      this.sortType = 2;
      this.title = " Mean"
    } else {
      this.sortType = 1;
      this.title = " Median"
    }
    this.regenerateFilter();
  }

  ngOnChanges() {
    this.regenerateFilter();
  }
  
    
    regenerateFilter() {
      //console.log("regenerateFilter: Analysis Passed to Component: " + this.selectedTeam);
     
    if (this.apiSummary) {

      this.apiSummary_filter = this.apiSummary;

      // this.apiSummary_filter.sort((a, b) => b.TotalScoreMean - a.TotalScoreMean);

      this.graphData = [];

      let robotList = [];
      let autoScoreList = []; //autonomous mean
     // let ballsList = []; //total balls mean
     // let scoreList = []; //total score mean
      let rampList = []; //climb mean
      let autoRampList = []; //tele upper balls
      let teleScoreList = []; //tele lower balls
      //let totalList = []; //tele total balls
    


      let rcount = 0;
      for (const t of this.apiSummary_filter)
      {
        rcount = 0;   // set count to 0
        this.fFlag = "N";
        for (const team of this.teamList) {

          if (t.team == team.team) {
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
        if ((rcount == 0 && this.filter == 0) || (this.fFlag == "Y" && this.filter == 1)) {

            robotList.push(t.team);

            if (this.sortType == 1) {
            
              autoScoreList.push(t.autoScoreMean);
            // ballsList.push(t.TotalBallsMean)
            // scoreList.push(t.TotalScoreMean)
              rampList.push(t.rampMean)
              autoRampList.push(t.autoRampMean)
              teleScoreList.push(t.teleTotalMean)
          //   totalList.push(t.TeleTotalBallsMean)
            }
            else {  
              autoScoreList.push(t.autoScoreMedian);
              rampList.push(t.rampMedian)
              autoRampList.push(t.autoRampMedian)
              teleScoreList.push(t.teleTotalMedian)
            }
        }
      }

        this.graphData.push({
          x: robotList,
          y: autoScoreList,
          type: 'bar',
          name: 'Auto Score',
          marker: {color: '#0000ff'}
        });
       /* this.graphData.push({
          x: robotList,
          y: ballsList,
          type: 'bar',
          name: 'Total Balls',
          marker: {color: '#5630ff'}
        });
        */
       /* this.graphData.push({
          x: robotList,
          y: scoreList,
          type: 'bar',
          name: 'Total Score',
          marker: {color: '#7a4efe'}
        });
        */
        
        this.graphData.push({
          x: robotList,
          y: autoRampList,
          type: 'bar',
          name: 'Auto Ramp',
          marker: {color: '#9569fd'}
        });
        this.graphData.push({
          x: robotList,
          y: teleScoreList,
          type: 'bar',
          name: 'Tele Score',
          marker: {color: '#ab84fc'}
        });
        
       /* this.graphData.push({
          x: robotList,
          y: totalList,
          type: 'bar',
          name: 'Tele Total',
          marker: {color: '#d1b9f8'}
        });
        */
        this.graphData.push({
          x: robotList,
          y: rampList,
          type: 'bar',
          name: 'Ramp',
          marker: {color: '#bf9efa'}          
        });
        this.graph = {
        data: this.graphData,
        layout: {width: 1000, height: 600, barmode: 'stack', xaxis: { type: 'category' }, title: "Summary Graph" +  this.title}
        };
      }
      
    } 
 
  
ngOnInit(): void {
  }

}