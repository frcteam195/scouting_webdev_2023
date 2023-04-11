import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, Final24 } from 'src/app/services/api.service'

@Component({
  selector: 'app-alliance',
  templateUrl: './alliance.component.html',
  styleUrls: ['./alliance.component.scss']
})
export class AllianceComponent implements OnInit {
  @Input() analysisTypeID: number = 0;
  @Input() Final24List: Final24[] = [];

  Team1: string = "";
  Team2: string = "";
  Team3: string = "";

  constructor(private apiService: ApiService, private router: Router) {
    // this.apiService.getFinal24().then(response => this.apiFinal24List = response);
    this.regenerateFilter();
    
  }

  ngOnInit(): void {
  }
  regenerateFilter() {
    console.log("final24",this.Final24List);
    // console.log("Made it to Filter with [" + this.matchNum + "]");
    if (this.Final24List) {
      let i = 0;
  
      for (const m of this.Final24List) {
        console.log("for Loop");
        if (i ==0) {
          this.Team1 = m.team;
          console.log("Team1");
        }
        else if (i==8) {
            this.Team2 = m.team;
            console.log("Team2");
         }
        else if (i==23) {
            this.Team2 = m.team;
            console.log("Team3");
        }
         
         

       }
    
  //    }
    } else {
      console.log("Match List Not Found");
    }
    console.log("teams"+this.Team1);
  }
}

