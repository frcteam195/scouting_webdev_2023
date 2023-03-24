import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import {Event} from '../../event';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  apiEvent: Event[]=[];
  event: number = 0;
  eventName: string = '';
  
  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router) { 


    this.apiService.EventReplay.subscribe(types => {
      this.apiEvent = types;
    });

  }

  select(event: number) {
    this.event=event;

    // Call apiService function to get Historical Event Data
    this.apiService.getHistory(event);

    // Get Event Name for setEvent function
    for(let e of this.apiEvent){ 
      if(e.eventID == this.event) {
        if(e.currentEvent == 1) {
          this.eventName = 'Current';
        } else {
          this.eventName = e.eventName;
        }
        break;
      }
    }

    this.apiService.setEvent(this.eventName);

    console.log("Getting event data for event: [" + event + "]");

  }

  ngOnInit(): void {
    this.apiService.setEvent('Current');
  }

}
