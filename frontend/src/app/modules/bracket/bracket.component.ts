import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alliance } from 'src/app/alliance';
import { ApiService, Final24 } from 'src/app/services/api.service';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent implements OnInit {

  @Input() final24List: Final24[] = [];

  teamList: string[] = [];
  alliance:number = 0;
  teamAverage: number = 0;
  teamMedian: number = 0;
  allianceData: Alliance[] = [];

  alliance1: string = "";
  alliance4: string = "";
  alliance5: string = "";
  alliance8: string = "";
  alliance2: string = "";
  alliance7: string = "";
  alliance3: string = "";
  alliance6: string = "";

  m1o: number = 0;
  m2o: number = 0;
  m3o: number = 0;
  m4o: number = 0;
  m5o: number = 0;
  m6o: number = 0;
  m7o: number = 0;
  m8o: number = 0;
  m9o: number = 0;
  m10o: number = 0;
  m11o: number = 0;
  m12o: number = 0;
  m13o: number = 0;
  m14o: number = 0;

  match5r: string = "";
  match5b: string = "";
  m5r: string = "";
  m5b: string = "";

  match6r: string = "";
  match6b: string = "";
  m6r: string = "";
  m6b: string = "";
  
  match7r: string = "";
  match7b: string = "";
  m7r: string = "";
  m7b: string = "";

  match8r: string = "";
  match8b: string = "";
  m8r: string = "";
  m8b: string = "";

  match9r: string = "";
  match9b: string = "";
  m9r: string = "";
  m9b: string = "";
    
  match10r: string = "";
  match10b: string = "";
  m10r: string = "";
  m10b: string = "";
    
  match11r: string = "";
  match11b: string = "";
  m11r: string = "";
  m11b: string = "";

  match12r: string = "";
  match12b: string = "";
  m12r: string = "";
  m12b: string = "";
  
  match13r: string = "";
  match13b: string = "";
  m13r: string = "";
  m13b: string = "";
    
  match14r: string = "";
  match14b: string = "";
  m14r: string = "";
  m14b: string = "";



  allianceList=[[0,8,16],[1,9,17],[2,10,18],[3,11,19],[4,12,20],[5,13,21],[6,14,22],[7,15,23]];
  // data: {alliance: 1, team: {1:0, 2:8, 3:23}}

  constructor(private apiService: ApiService, private router: Router) {

    console.log("Made it here");
    // this.regenerateFilter();

  }

  ngOnInit(): void {

    
  }
  
  ngOnChanges() { 
    this.regenerateFilter();
    this.setWin();

  }



  regenerateFilter() {
    console.log("regenerateFilter");

    if (this.final24List) {
      this.alliance=1; // Position in allianceList Array
      this.allianceData = [];

      for (const x in this.allianceList) {
        let i=0; // Position in final24List Array
        let x=this.alliance -1;

        // this.final24List_filter = [];
        this.teamList = [];

        for (const f of this.final24List) {
          // console.log("Loop: " + i);

          if (this.allianceList[x].includes(i)) { 

              this.teamList.push(f.team);

          }
          i=i+1;
        }

        let workList={"alliance":this.alliance,"team1":this.teamList[0],"team2":this.teamList[1],
                      "team3":this.teamList[2],"teamAverage":0,"teamMedian":0};
        this.allianceData.push(workList);

        this.alliance=this.alliance+1;
      } 

    } else {
      console.log("No Teams List Found");
    }

    this.alliance1 = this.allianceData[0].team1 + "-" + this.allianceData[0].team2 + "-" + this.allianceData[0].team3;
    this.alliance4 = this.allianceData[3].team1 + "-" + this.allianceData[3].team2 + "-" + this.allianceData[3].team3;
    this.alliance5 = this.allianceData[4].team1 + "-" + this.allianceData[4].team2 + "-" + this.allianceData[4].team3;
    this.alliance8 = this.allianceData[7].team1 + "-" + this.allianceData[7].team2 + "-" + this.allianceData[7].team3;

    this.alliance2 = this.allianceData[1].team1 + "-" + this.allianceData[1].team2 + "-" + this.allianceData[1].team3;
    this.alliance7 = this.allianceData[6].team1 + "-" + this.allianceData[6].team2 + "-" + this.allianceData[6].team3;
    this.alliance3 = this.allianceData[2].team1 + "-" + this.allianceData[2].team2 + "-" + this.allianceData[2].team3;
    this.alliance6 = this.allianceData[5].team1 + "-" + this.allianceData[5].team2 + "-" + this.allianceData[5].team3;


  }



  setWin() {
    console.log("RUnning setWin");
    // if (match == 1) {
      if (this.m1o == 1) {
        this.match7r = this.alliance1;
        this.match5r = this.alliance8;
        this.m7r = "1";
        this.m5r = "8";
      } else if (this.m1o == 2) {
        this.match7r = this.alliance8;
        this.match5r = this.alliance1;
        this.m7r = "8";
        this.m5r = "1";
      } else {
        this.match7r = "Match 1 Winner";
        this.m7r = " ";
        this.match5r = "Match 1 Loser";
        this.m5r = " ";
      }

      if (this.m2o == 1) {
        this.match7b = this.alliance4;
        this.match5b = this.alliance5;
        this.m7b = "4";
        this.m5b = "5";
      } else if (this.m2o == 2) {
        this.match7b = this.alliance5;
        this.match5b = this.alliance4;
        this.m7b = "5";
        this.m5b = "4";
      } else {
        this.match7b = "Match 2 Winner";
        this.m7b = " ";
        this.match5b = "Match 2 Loser";
        this.m5b = " ";
      }

      if (this.m3o == 1) {
        this.match8r = this.alliance2;
        this.match6r = this.alliance7;
        this.m8r = "2";
        this.m6r = "7";
      } else if (this.m3o == 2) {
        this.match8r = this.alliance7;
        this.match6r = this.alliance2;
        this.m8r = "7";
        this.m6r = "2";
      } else {
        this.match8r = "Match 3 Winner";
        this.m8r = " ";
        this.match6r = "Match 3 Loser";
        this.m6r = " ";
      }

      if (this.m4o == 1) {
        this.match8b = this.alliance3;
        this.match6b = this.alliance6;
        this.m8b = "3";
        this.m6b = "6";
      } else if (this.m4o == 2) {
        this.match8b = this.alliance6;
        this.match6b = this.alliance3;
        this.m8b = "6";
        this.m6b = "3";
      } else {
        this.match8b = "Match 4 Winner";
        this.m8b = " ";
        this.match6b = "Match 4 Loser";
        this.m6b = " ";
      }

      if (this.m5o == 1) {
        this.match10b = this.match5r;
        this.m10b = this.m5r;
      } else if (this.m5o == 2) {
        this.match10b = this.match5b;
        this.m10b = this.m5b;
      } else {
        this.match10b = "Match 5 Winner";
        this.m10b = " ";
      }

      if (this.m6o == 1) {
        this.match9b = this.match6r;
        this.m9b = this.m6r;
      } else if (this.m6o == 2) {
        this.match9b = this.match6b;
        this.m9b = this.m6b;
      } else {
        this.match9b = "Match 6 Winner";
        this.m9b = " ";
      }

      if (this.m7o == 1) {
        this.match11r = this.match7r;
        this.match9r = this.match7b;
        this.m11r = this.m7r;
        this.m9r = this.m7b;
      } else if (this.m7o == 2) {
        this.match11r = this.match7b;
        this.match9r = this.match7r;
        this.m11r = this.m7b;
        this.m9r = this.m7r;
      } else {
        this.match11r = "Match 7 Winner";
        this.m11r = " ";
        this.match9r = "Match 7 Loser";
        this.m9r = " ";
      }

      if (this.m8o == 1) {
        this.match11b = this.match8r;
        this.match10r = this.match8b;
        this.m11b = this.m8r;
        this.m10r = this.m8b;
      } else if (this.m8o == 2) {
        this.match11b = this.match8b;
        this.match10r = this.match8r;
        this.m11b = this.m8b;
        this.m10r = this.m8r;
      } else {
        this.match11b = "Match 8 Winner";
        this.m11b = " ";
        this.match10r = "Match 8 Loser";
        this.m10r = " ";
      }

      if (this.m9o == 1) {
        this.match12b = this.match9r;
        this.m12b = this.m9r;
      } else if (this.m9o == 2) {
        this.match12b = this.match9b;
        this.m12b = this.m9b;
      } else {
        this.match12b = "Match 9 Winner";
        this.m12b = " ";
      }

      if (this.m10o == 1) {
        this.match12r = this.match10r;
        this.m12r = this.m10r;
      } else if (this.m10o == 2) {
        this.match12r = this.match10b;
        this.m12r = this.m10b;
      } else {
        this.match12r = "Match 10 Winner";
        this.m12r = " ";
      }

      if (this.m11o == 1) {
        this.match14r = this.match11r;
        this.m14r = this.m11r;
        this.match13r = this.match11b;
        this.m13r = this.m11b;
      } else if (this.m11o == 2) {
        this.match14r = this.match11b;
        this.m14r = this.m11b;
        this.match13r = this.match11r;
        this.m13r = this.m11r;
      } else {
        this.match14r = "Match 11 Winner";
        this.m14r = " ";
        this.match13r = "Match 11 Loser";
        this.m13r = " ";
      }

      if (this.m12o == 1) {
        this.match13b = this.match12r;
        this.m13b = this.m12r;
      } else if (this.m12o == 2) {
        this.match13b = this.match12b;
        this.m13b = this.m12b;
      } else {
        this.match13b = "Match 12 Winner";
        this.m13b = " ";
      }

      if (this.m13o == 1) {
        this.match14b = this.match13r;
        this.m14b = this.m13r;
      } else if (this.m13o == 2) {
        this.match14b = this.match13b;
        this.m14b = this.m13b;
      } else {
        this.match14b = "Match 13 Winner";
        this.m14b = " ";
      }

  }

  buttonClass(match: number, status: number) {

    if (match==1) {
      if (status==this.m1o) {
        return "button_green";
      } else {
        return "button";
      }
    }

    if (match==2) {
      if (status==this.m2o) {
        return "button_green";
      } else {
        return "button";
      }
    }

    if (match==3) {
      if (status==this.m3o) {
        return "button_green";
      } else {
        return "button";
      }
    }

    if (match==4) {
      if (status==this.m4o) {
        return "button_green";
      } else {
        return "button";
      }
    }

    if (match==5) {
      if (status==this.m5o) {
        return "button_green";
      } else {
        return "button";
      }
    }

    if (match==6) {
      if (status==this.m6o) {
        return "button_green";
      } else {
        return "button";
      }
    }

    if (match==7) {
      if (status==this.m7o) {
        return "button_green";
      } else {
        return "button";
      }
    }

    if (match==8) {
      if (status==this.m8o) {
        return "button_green";
      } else {
        return "button";
      }
    }

    if (match==9) {
      if (status==this.m9o) {
        return "button_green";
      } else {
        return "button";
      }
    }

    if (match==10) {
      if (status==this.m10o) {
        return "button_green";
      } else {
        return "button";
      }
    }
    
    if (match==11) {
      if (status==this.m11o) {
        return "button_green";
      } else {
        return "button";
      }
    }
    
    if (match==12) {
      if (status==this.m12o) {
        return "button_green";
      } else {
        return "button";
      }
    }
    
    if (match==13) {
      if (status==this.m13o) {
        return "button_green";
      } else {
        return "button";
      }
    }
    
    if (match==14) {
      if (status==this.m14o) {
        return "button_green";
      } else {
        return "button";
      }
    }

    return "button";
      
  }

  resetBracket() {

    this.m1o = 0;
    this.m2o = 0;
    this.m3o = 0;
    this.m4o = 0;
    this.m5o = 0;
    this.m6o = 0;
    this.m7o = 0;
    this.m8o = 0;
    this.m9o = 0;
    this.m10o = 0;
    this.m11o = 0;
    this.m12o = 0;
    this.m13o = 0;
    this.m14o = 0;

    this.setWin();
  }

  autoBracket() {

    let m1r_value = 147;
    let m1b_value = 148;
    let m2r_value = 165;
    let m2b_value = 154;
    let m3r_value = 164;
    let m3b_value = 134;
    let m4r_value = 156;
    let m4b_value = 146;

    let m5r_value = 0;
    let m5b_value = 0;
    let m6r_value = 0;
    let m6b_value = 0;
    let m7r_value = 0;
    let m7b_value = 0;
    let m8r_value = 0;
    let m8b_value = 0;
    let m9r_value = 0;
    let m9b_value = 0;
    let m10r_value = 0;
    let m10b_value = 0;
    let m11r_value = 0;
    let m11b_value = 0;
    let m12r_value = 0;
    let m12b_value = 0;
    let m13r_value = 0;
    let m13b_value = 0;
    let m14r_value = 0;
    let m14b_value = 0;


    // If m1r_value > m1b_value 
    // then m1o=1, m7r_value = m1r_value, m5r_value = m1b_value
    // else m1o=2, m7r_value = m1b_value, m5r_value = m1r_value 
    if (m1r_value > m1b_value) {
      this.m1o = 1;
      m7r_value = m1r_value;
      m5r_value = m1b_value;
    } else {
      this.m1o=2;
      m7r_value = m1b_value;
      m5r_value = m1r_value;
    }

    // If m2r_value > m2b_value 
    // then m2o=1, m7b_value = m2r_value, m5b_value = m2b_value
    // else m2o=2, m7b_value = m2b_value, m5b_value = m2r_value
    if (m2r_value > m2b_value ) {
      this.m2o=1;
      m7b_value = m2r_value;
      m5b_value = m2b_value;
    } else {
      this.m2o=2;
      m7b_value = m2b_value;
      m5b_value = m2r_value;
    }

    // If m3r_value > m3b_value 
    // then m3o=1, m8r_value = m3r_value, m6r_value = m3b_value
    // else m3o=2, m8r_value = m3b_value, m6r_value = m3r_value 
    if (m3r_value > m3b_value) {
      this.m3o=1;
      m8r_value = m3r_value;
      m6r_value = m3b_value;
    } else {
      this.m3o=2;
      m8r_value = m3b_value;
      m6r_value = m3r_value;
    }

    // If m4r_value > m4b_value 
    // then m4o=1, m8b_value = m4r_value, m6b_value = m4b_value
    // else m4o=2, m8b_value = m4b_value, m6b_value = m4r_value
    if (m4r_value > m4b_value) {
      this.m4o=1;
      m8b_value = m4r_value;
      m6b_value = m4b_value;
    } else {
      this.m4o=2;
      m8b_value = m4b_value;
      m6b_value = m4r_value;
    }

    // If m5r_value > m5b_value 
    // then m5o=1, m10b_value = m5r_value
    // else m5o=2, m10b_value = m5b_value
    if (m5r_value > m5b_value) {
      this.m5o=1;
      m10b_value = m5r_value;
    } else {
      this.m5o=2;
      m10b_value = m5b_value;
    }

    // If m6r_value > m6b_value 
    // then m6o=1, m9b_value = m6r_value
    // else m6o=2, m9b_value = m6b_value
    if (m6r_value > m6b_value) {
      this.m6o=1;
      m9b_value = m6r_value;
    } else {
      this.m6o=2;
      m9b_value = m6b_value;
    }

    // If m7r_value > m7b_value 
    // then m7o=1, m11r_value = m7r_value, m9r_value = m7b_value
    // else m7o=2, m11r_value = m7b_value, m9r_value = m7r_value 
    if (m7r_value > m7b_value) {
      this.m7o=1;
      m11r_value = m7r_value;
      m9r_value = m7b_value;
    } else {
      this.m7o=2;
      m11r_value = m7b_value;
      m9r_value = m7r_value;
    }

    // If m8r_value > m8b_value 
    // then m8o=1, m11b_value = m4r_value, m10r_value = m4b_value
    // else m8o=2, m11b_value = m4b_value, m10r_value = m4r_value
    if (m8r_value > m8b_value) {
      this.m8o=1;
      m11b_value = m4r_value;
      m10r_value = m4b_value;
    } else {
      this.m8o=2;
      m11b_value = m4b_value;
      m10r_value = m4r_value;
    }

    // If m9r_value > m9b_value 
    // then m9o=1, m12b_value = m9r_value
    // else m9o=2, m12b_value = m9b_value
    if (m9r_value > m9b_value) {
      this.m9o=1;
      m12b_value = m9r_value;
    } else {
      this.m9o=2;
      m12b_value = m9b_value;
    }

    // If m10r_value > m10b_value 
    // then m10o=1, m12r_value = m10r_value
    // else m10o=2, m12r_value = m10b_value
    if (m10r_value > m10b_value) {
      this.m10o=1;
      m12r_value = m10r_value;
    } else {
      this.m10o=2;
      m12r_value = m10b_value;
    }
    
    // If m11r_value > m11b_value 
    // then m11o=1, m14r_value = m11r_value, m13r_value = m11b_value
    // else m11o=2, m14r_value = m11b_value, m13r_value = m11r_value
    if (m11r_value > m11b_value) {
      this.m11o=1;
      m14r_value = m11r_value;
      m13r_value = m11b_value;
    } else {
      this.m11o=2;
      m14r_value = m11b_value;
      m13r_value = m11r_value;
    }

    // If m12r_value > m12b_value 
    // then m12o=1, m13b_value = m12r_value
    // else m12o=2, m13b_value = m12b_value
    if (m12r_value > m12b_value) {
      this.m12o=1;
      m13b_value = m12r_value;
    } else {
      this.m12o=2;
      m13b_value = m12b_value;
    }

    // If m13r_value > m13b_value 
    // then m13o=1, m14b_value = m13r_value
    // else m13o=2, m14b_value = m13b_value
    if (m13r_value > m13b_value) {
      this.m13o=1;
      m14b_value = m13r_value;
    } else {
      this.m13o=2;
      m14b_value = m13b_value;
    }
    
    // If m14r_value > m14b_value 
    // then m14o=1
    // else m14o=2
    if (m14r_value > m14b_value) {
      this.m14o=1;
    } else {
      this.m14o=2;
    }

    this.setWin();

  }

}
