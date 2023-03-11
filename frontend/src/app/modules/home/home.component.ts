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
  event:number = 0;
  
  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router) { 


    this.apiService.EventReplay.subscribe(types => {
      this.apiEvent = types;
    });

  }

  select(event: number) {
    this.event=event;
    // Sets event to be passed to next record
    this.apiService.getHistory(event);

    console.log("Getting event data for event: [" + event + "]");

  }

  ngOnInit(): void {
  }

}
