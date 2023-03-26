import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatchInfo } from '../../matchinfo';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.scss']
})
export class MatchInfoComponent implements OnInit {
  @Input() match: number;

  showAuto: number=0;
  showTele: number=0;
  showCoop: number=0;
  apiMatchList: MatchInfo[];
  constructor(private apiService: ApiService) {
    this.match=0;
    this.apiMatchList = [];
    this.apiService.MatchInfoReplay.subscribe(match => {
      this.apiMatchList = match;
    });
   }

  ngOnInit(): void {
  }

    showHide() {
      if(this.showAuto== 0 )
      {
        this.showAuto = 1;
        
      }
      else
      {
        this.showAuto = 0
      }
    } 

    showHid() {
      if(this.showTele ==0)
      {
        this.showTele = 1;

      }
      else
      {
        this.showTele = 0;
      }
    }
    showH() {
      if(this.showCoop ==0)
      {
        this.showCoop=1;
      }
      else
      {
        this.showCoop =0;
      }
    }
}
