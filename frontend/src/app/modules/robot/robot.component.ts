import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService, CurrTeams } from 'src/app/services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Teams } from '../../teams';

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.scss']
})
export class RobotComponent implements OnInit {

  team: string;
  analysisGroup: number = 2;
  display: number;
  nestedDisplay: number;
  roboPic: String;
  apiCurrTeamList: CurrTeams[];
  apiTeamsList: Teams[] = [];  
  access: number = 0;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {

    this.apiCurrTeamList = [];
    this.apiTeamsList = [];
    this.team="195";
    this.display=1;
    this.nestedDisplay=1;
    this.roboPic = "https://cdn.discordapp.com/attachments/830144707794305064/949107933260677130/error_robot_not_found.png";

    this.apiService.TeamsReplay.subscribe(Teams => {
      this.apiTeamsList = Teams;
    });

    this.apiService.CurrTeamReplay.subscribe(currteam => {
      this.apiCurrTeamList = currteam;
    });

  }

  setTeam(team: string) {
    console.log(team);
    this.team = team;
    this.roboPic = this.getRoboPic(this.team);
  }
  //code for getting picture when eventually implemented to teams table
  getRoboPic(ID: string) {
    return "https://scouting.team195.com/images/frc"+this.team+".jpg";
  }
  
  
  setDisplay(display: number) {
    this.display = display;
  }
  setNestedDisplay(nestedDisplay: number) {
    this.nestedDisplay = nestedDisplay;
  }

  ngOnInit(): void {


    // Verify User has access for this page.
    this.access = Number(localStorage.getItem('access')) || -1;

    if(this.access <= 0) {
      this.router.navigate(["login/"]); 
    } else {
      this.team = this.route.snapshot.paramMap.get('team') || '';
      //console.log("Check Robot: " + this.team)
    }

  }
    
}
