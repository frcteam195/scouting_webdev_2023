import { Component, OnInit } from '@angular/core';
import { ApiService, CEA } from '../../services/api.service';
import CeaJson from '../../cea.json';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {

  Analysis: CEA[] = CeaJson;


  apiAnalysis: CEA[] = [];

  constructor(private apiService: ApiService) {
    this.apiService.CEAReplay.subscribe((analysis) => (this.apiAnalysis = analysis));
  }



  ngOnInit(): void {
  }

}
