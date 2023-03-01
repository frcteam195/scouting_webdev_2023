import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CEA } from '../../CEA';
@Component({
  selector: 'app-robot-graphic',
  templateUrl: './robot-graphic.component.html',
  styleUrls: ['./robot-graphic.component.scss']
})
export class RobotGraphicComponent implements OnInit {

  @Input() selectedTeam: string;

  apiAnalysis: CEA[] = [];
  title: String;
  titleShow = true;

  constructor(private apiService: ApiService) {
    this.apiAnalysis = [];
    this.title = "Title";
    this.selectedTeam = "";

    // Update the filter whenever the inputting data changes
    this.apiService.CEAReplay.subscribe(analysis => {
      this.apiAnalysis = analysis;
    });

  }

  ngOnInit(): void {
    console.log("Value passed to robo graphic: " + this.selectedTeam)
  }

}
