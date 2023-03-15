import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Checklist } from '../../checklist';
import { Scouters } from '../../scouters';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})

export class ChecklistComponent implements OnInit {

  apiCheck: Checklist[] = [];
  apiCheck_filter: Checklist[] = [];
  apiScouters: Scouters[] = [];
  scouter: number = 0;
  matchList: number[] = [];
  matchNum: number = 0;

  constructor(public apiService: ApiService, private formBuilder: FormBuilder) {

    this.apiService.ScouterReplay.subscribe(types => {
      this.apiScouters = types;
    });


    this.apiService.CheckReplay.subscribe(list => {
      this.apiCheck = list
      this.getMatchList();
    });

    this.getMatchList();
    this.regenerateFilter();  


   }

  ngOnInit(): void {
  }

  select(value: number) {
    // Sets Scouter to be passed to next record
    this.matchNum = value;

    console.log("Scouter: [" + this.matchNum + "]");
    this.regenerateFilter();  
  }


  getMatchList() {
    console.log("Getting list of Completed Matches");
    if (this.apiCheck) {

      this.matchList = [];

      for (const s of this.apiCheck) {
        if(!this.matchList.includes(s.matchNum)) {
          this.matchList.push(s.matchNum);
        }
        
      }
    } else {
      this.matchList = [];
    }

    console.log("Matches: [" + this.matchList + "]");
  }



  regenerateFilter() {
    console.log("regenerateFilter: Start: ");

    if (this.apiCheck) {

      this.apiCheck_filter = [];

      // Sort Matches by MatchNum
      // this.apiMatchL2.sort((a, b) => a.matchNum - b.matchNum);
      
      // Filter
      for (const c of this.apiCheck) {

        if (c.matchNum == this.matchNum) { 

            this.apiCheck_filter.push(c);

        }
       } 
    } else {
      this.apiCheck_filter = [];
    }
  }

getRowClass() {
  return "rowNormal";
}

}
