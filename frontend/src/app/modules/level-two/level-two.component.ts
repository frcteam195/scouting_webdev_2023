import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Level2 } from '../../level2';

@Component({
  selector: 'app-level-two',
  templateUrl: './level-two.component.html',
  styleUrls: ['./level-two.component.scss']
})
export class LevelTwoComponent implements OnInit {
  @Input() team: string;

  apiLevel2: Level2[] = []; 
  constructor(private apiService: ApiService) {
    this.team="195";
    this.apiService.Level2Replay.subscribe(level2 => {
      this.apiLevel2 = level2;
    });
   }

  ngOnInit(): void {
  }

}
