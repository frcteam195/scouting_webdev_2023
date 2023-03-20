import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Teams } from '../../teams';
import { Scouters } from './../../scouters';


export interface PitStatus {
  pitStatusID: number;
  pitStatus: string
}

@Component({
  selector: 'app-pit-data',
  templateUrl: './pit-data.component.html',
  styleUrls: ['./pit-data.component.scss']
})
export class PitDataComponent implements OnInit {

  @Input() team: string;
  apiTeamsList: Teams[] = [];
  apiScouters: Scouters[] = [];
  
  status: PitStatus[] = [{ pitStatusID: 0,pitStatus:"Open"},
                          { pitStatusID: 1,pitStatus:"In Progress"},
                          { pitStatusID: 2,pitStatus:"Partially Complete"},
                          { pitStatusID: 3,pitStatus:"Complete"}];

  constructor(private apiService: ApiService) { 
    this.apiService.TeamsReplay.subscribe((Teams) => (this.apiTeamsList = Teams));

  
  this.apiService.ScouterReplay.subscribe(scouter => {
    this.apiScouters = scouter;
  });


    this.team="195";
  }

  getYesNo(ID: Number) {
    if (ID==1 ){
      return "Yes";
    } else if (ID == 0) {
      return "No";
    }
    return "Error, input out of bounds";
  }

  getClimbPosition(ID: Number) {
    if (ID==4) {
      return "Any";
    } else if (ID==3) {
      return "Right";
    } else if (ID==2) {
      return "Center";
    } else if (ID==1) {
      return "Left";
    } else if (ID==0) {
      return "None";
    }
    return "Error, input out of bounds"
  }

  getClimbHeight(ID: Number) {
    if (ID==4){
      return "Traversal";
    } else if (ID==3) {
      return "High";
    } else if (ID==2) {
      return "Mid";
    } else if (ID==1) {
      return "Low";
    } else if (ID==0) {
      return "None";
    }
    return "Error, input out of bounds";
  }

  ngOnInit(): void {
  }

}
