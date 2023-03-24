import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Event } from '../../../event';

@Component({  
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  apiEvent: Event[] = [];
  display: number;

  public eventName: Observable<string>;
  public lastDBtime: Observable<string>;


  constructor(private apiService: ApiService) { 

    this.eventName = this.apiService.getEvent();
    this.lastDBtime = this.apiService.getTime();
    
    this.apiService.EventReplay.subscribe(types => {
      this.apiEvent = types;
    });

    this.display=1;

    console.log("Event: ", this.eventName);
  }

  setDisplay(ID: number){
    this.display=ID;

  }

  ngOnInit(): void {

    // Call apiService functions to get time and event
    this.lastDBtime = this.apiService.getTime();
    this.eventName = this.apiService.getEvent();

  }


}
