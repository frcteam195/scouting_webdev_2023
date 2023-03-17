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
  buttonText: string = "Open";
  buttonStatus: number = 0;

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

    // console.log("Scouter: [" + this.matchNum + "]");
    this.regenerateFilter();  
  }


  getMatchList() {
    // console.log("Getting list of Teams Matches");
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

    // console.log("Matches: [" + this.matchList + "]");
  }



  regenerateFilter() {
    console.log("regenerateFilter");

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

getRowClass(value: number) {
  if(value == 1){
    return "rowPass";
  }

  return "rowNormal";
}

getTextClass(value: number) {
  console.log("Alliance Station: " + value); 
  if(value > 3) {
    return "textBlue";
  } else {
    return "textRed";
  }
}

changeStatus(id: number) {

  for(let a of this.apiCheck_filter){ 

    // console.log("Record "+a.listID+" has status "+a.taskStatus);
        
    if(a.listID == id) {
      if(a.taskStatus == 0) {
        a.taskStatus = 1;
      } else {
        a.taskStatus = 0;
      }
    }
  }
}

save() {
  console.log("Saving Checklist")
  this.apiService.saveListData(this.apiCheck);
}

changeMatch(match: number, value: number) {
  // console.log("Match Number: " + match);
  let location=this.matchList.indexOf(Number(match));

  if(location == -1) {
    this.matchNum=this.matchList[0];
  } else {
    this.matchNum=this.matchList[location+value];
  }

  this.regenerateFilter();
}

}
