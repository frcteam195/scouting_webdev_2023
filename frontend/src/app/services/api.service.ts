import { Word } from './../word';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {F} from "@angular/cdk/keycodes";
import { formatDate } from '@angular/common';
import { relayout } from 'plotly.js-dist-min';
import { Types } from '../types';
import { WordCloud } from '../wordcloud';
import { CEA } from '../CEA';
import { Level2 } from '../level2';
import { Matches } from '../matches'
import { Teams } from '../teams'
import { Summary } from '../summary';
import { environment } from '../../environments/environment';
import { Event } from '../event';
import { Access } from '../access';
import { Router } from '@angular/router';
import { Checklist } from '../checklist';
import { Scouters } from '../scouters';


export class Final24 {
  team: string;

  constructor() {
    this.team = '';
  }
}

export interface CurrTeams {
  team: Number;
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public CEAReplay: ReplaySubject<CEA[]>;
  public MatchReplay: ReplaySubject<Matches[]>;
  public TeamsReplay: ReplaySubject<Teams[]>;
  public CurrTeamReplay: ReplaySubject<CurrTeams[]>;
  public SummaryReplay: ReplaySubject<Summary[]>;
  public WordReplay: ReplaySubject<Word[]>;
  public TypesReplay: ReplaySubject<Types[]>;
  public CloudReplay: ReplaySubject<WordCloud[]>;
  public Level2Replay: ReplaySubject<Level2[]>;
  public EventReplay: ReplaySubject<Event[]>;
  public CheckReplay: ReplaySubject<Checklist[]>;
  public ScouterReplay: ReplaySubject<Scouters[]>;

  private apiUrl = environment.apiUrl;

  status: string = "";

  loading: boolean = true;
  errorMessage: string = "";
  apiAccess: Access[]=[];

  access: number = 0;

  public globalEvent$ = new BehaviorSubject<string>('Current');
  public globalTime$ = new BehaviorSubject<string>('Unknown');

  constructor(private http: HttpClient, private router: Router) {
    this.CEAReplay = new ReplaySubject(1);
    this.MatchReplay = new ReplaySubject(1);
    this.TeamsReplay = new ReplaySubject(1);
    this.CurrTeamReplay = new ReplaySubject(1);
    this.SummaryReplay = new ReplaySubject(1);
    this.WordReplay = new ReplaySubject(1);
    this.TypesReplay = new ReplaySubject(1);
    this.CloudReplay = new ReplaySubject(1);
    this.Level2Replay = new ReplaySubject(1);
    this.EventReplay = new ReplaySubject(1);
    this.CheckReplay = new ReplaySubject(1);
    this.ScouterReplay = new ReplaySubject(1);


    // Verify User has access for this page.
    this.access = Number(localStorage.getItem('access')) || -1;

    if(this.access > 0) {
      // Automatically load the data once when the application starts
      this.loadData();
    }


  }

  // This loads the data on service initialization, and then makes the data
  //  available as a ReplaySubject.
  loadData(): void {

    localStorage.setItem('event', '0');

    console.log("Check Login");

    // First try to load a fresh copy of the data from the API
    this.http.get<CEA[]>(this.apiUrl + '/analysis195').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.CEAReplay.next(response as CEA[]);
      // Might as well store it while we have it
      console.log("Getting Data from Database");

      this.setTime();

      localStorage.setItem('CEA', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        console.log("Getting Data from Cache");
        this.CEAReplay.next(JSON.parse(localStorage.getItem('CEA')!) as CEA[]);
      } catch (err) {
        console.error('Could not load Analysis data from server or cache!');
      }
    });

    // First try to load a fresh copy of the data from the API
    this.http.get<Matches[]>(this.apiUrl + '/matchinfo').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.MatchReplay.next(response as Matches[]);
      // Might as well store it while we have it
      localStorage.setItem('Matches', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.MatchReplay.next(JSON.parse(localStorage.getItem('Matches')!) as Matches[]);
      } catch (err) {
        console.error('Could not load Matches data from server or cache!');
      }
    });

    // First try to load a fresh copy of the data from the API
    this.http.get<CurrTeams[]>(this.apiUrl + '/currteam').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.CurrTeamReplay.next(response as CurrTeams[]);
      // Might as well store it while we have it
      localStorage.setItem('CurrTeams', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.CurrTeamReplay.next(JSON.parse(localStorage.getItem('CurrTeams')!) as CurrTeams[]);
      } catch (err) {
        console.error('Could not load Current Teams data from server or cache!');
      }
    });

    // First try to load a fresh copy of the data from the API
    this.http.get<Summary[]>(this.apiUrl + '/summary').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.SummaryReplay.next(response as Summary[]);
      // Might as well store it while we have it
      localStorage.setItem('Summary', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.SummaryReplay.next(JSON.parse(localStorage.getItem('Summary')!) as Summary[]);
      } catch (err) {
        console.error('Could not load Summary data from server or cache!');
      }
    });

    // First try to load a fresh copy of the data from the API
    this.http.get<Teams[]>(this.apiUrl + '/pitdata').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.TeamsReplay.next(response as Teams[]);
      // Might as well store it while we have it
      localStorage.setItem('Teams', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.TeamsReplay.next(JSON.parse(localStorage.getItem('Teams')!) as Teams[]);
      } catch (err) {
        console.error('Could not load Teams data from server or cache!');
      }
    });

    // First try to load a fresh copy of the data from the API
    this.http.get<Types[]>(this.apiUrl + '/types').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.TypesReplay.next(response as Types[]);
      // Might as well store it while we have it
      localStorage.setItem('Types', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.TypesReplay.next(JSON.parse(localStorage.getItem('Types')!) as Types[]);
      } catch (err) {
        console.error('Could not load analysis types from server or cache!');
      }
    });


    this.http.get<Event[]>(this.apiUrl + '/event').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.EventReplay.next(response as Event[]);
      // Might as well store it while we have it
      localStorage.setItem('Event', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.EventReplay.next(JSON.parse(localStorage.getItem('Event')!) as Event[]);
      } catch (err) {
        console.error('Could not load Event data from server or cache!');
      }
    });

    

    // First try to load a fresh copy of the data from the API
    this.http.get<Level2[]>(this.apiUrl + '/level2').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.Level2Replay.next(response as Level2[]);
      // Might as well store it while we have it
      localStorage.setItem('Level2', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.Level2Replay.next(JSON.parse(localStorage.getItem('Level2')!) as Level2[]);
      } catch (err) {
        console.error('Could not load analysis types from server or cache!');
      }
    });

    // First try to load a fresh copy of the data from the API
    this.http.get<Checklist[]>(this.apiUrl + '/checklist').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.CheckReplay.next(response as Checklist[]);
      // Might as well store it while we have it
      localStorage.setItem('Checklist', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.CheckReplay.next(JSON.parse(localStorage.getItem('Checklist')!) as Checklist[]);
      } catch (err) {
        console.error('Could not load Checklist from server or cache!');
      }
    });
    
    
    // First try to load a fresh copy of the data from the API
    this.http.get<Scouters[]>(this.apiUrl + '/scouters').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.ScouterReplay.next(response as Scouters[]);
      // Might as well store it while we have it
      localStorage.setItem('Scouters', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.ScouterReplay.next(JSON.parse(localStorage.getItem('Scouters')!) as Scouters[]);
      } catch (err) {
        console.error('Could not load Scouter data from server or cache!');
      }
    });

  }

//load historical data COMING SOON TO A THEATER NEAR YOUUU

  async getFinal24(): Promise<Final24[]> {
    // First try to load a fresh copy of the data from the API
    const options = {params: new HttpParams().append('table', 'final24')};
    // First try to load a fresh copy of the data from the API
    try {
      const response = await this.http.get<Final24[]>(this.apiUrl + '/final24',options).toPromise();
      localStorage.setItem('Final24', JSON.stringify(response));
      return response as Final24[];
    } catch (e) {
      try {
        // Send the cached data
        return JSON.parse(localStorage.getItem('Final24')!) as Final24[];
      } catch (err) {
        console.error('Could not load Final24 data from server or cache!');
        return [];
      }
    }
  }

  saveFinal24(final24: Final24[]){
    localStorage.setItem('Final24', JSON.stringify(final24));

    //const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    //const params = new HttpParams().append('table', 'Final24');
    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'}),
                     params: new HttpParams().append('table', 'final24')};
    //this.http.delete(this.apiUrl + '/final24').subscribe(() => this.status = 'Delete successful');
    
    this.http.post<Final24[]>(this.apiUrl + '/final24-update', JSON.stringify(final24), options).subscribe();

    console.log("Saving Final24 Data");

  }

  async getDnp(): Promise<Final24[]> {
    // First try to load a fresh copy of the data from the API
    const options = {params: new HttpParams().append('table', 'dnpList')};

    try {
      const response = await this.http.get<Final24[]>(this.apiUrl + '/final24',options).toPromise();
      localStorage.setItem('DNP', JSON.stringify(response));
      return response as Final24[];
    } catch (e) {
      try {
        // Send the cached data
        return JSON.parse(localStorage.getItem('DNP')!) as Final24[];
      } catch (err) {
        console.error('Could not load DNP data from server or cache!');
        return [];
      }
    }
  }  


  saveDnp(dnp: Final24[]){
    localStorage.setItem('DNP', JSON.stringify(dnp));

    //const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'}),
                     params: new HttpParams().append('table', 'dnpList')};
    //this.http.delete(this.apiUrl + '/final24').subscribe(() => this.status = 'Delete successful');
    
    this.http.post<Final24[]>(this.apiUrl + '/final24-update', JSON.stringify(dnp), options).subscribe();

    console.log("Saving DNP Data");

  }

  async getPick(): Promise<Final24[]> {
    // First try to load a fresh copy of the data from the API
    const options = {params: new HttpParams().append('table', 'pickList1')};

    try {
      const response = await this.http.get<Final24[]>(this.apiUrl + '/final24',options).toPromise();
      localStorage.setItem('Pick', JSON.stringify(response));
      return response as Final24[];
    } catch (e) {
      try {
        // Send the cached data
        return JSON.parse(localStorage.getItem('Pick')!) as Final24[];
      } catch (err) {
        console.error('Could not load Pick List data from server or cache!');
        return [];
      }
    }
  }  


  savePick(picklist: Final24[]){
    localStorage.setItem('Pick', JSON.stringify(picklist));

    //const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'}),
                     params: new HttpParams().append('table', 'pickList1')};
    //this.http.delete(this.apiUrl + '/final24').subscribe(() => this.status = 'Delete successful');
    
    this.http.post<Final24[]>(this.apiUrl + '/final24-update', JSON.stringify(picklist), options).subscribe();

    console.log("Saving Pick List Data");

  }

  async getWatch1(): Promise<Final24[]> {
    // First try to load a fresh copy of the data from the API
    
    const options = {params: new HttpParams().append('table', 'watch1')};

    try {
      const response = await this.http.get<Final24[]>(this.apiUrl + '/final24',options).toPromise();
      localStorage.setItem('Watch1', JSON.stringify(response));
      return response as Final24[];
    } catch (e) {
      try {
        // Send the cached data
        return JSON.parse(localStorage.getItem('Watch1')!) as Final24[];
      } catch (err) {
        console.error('Could not load Watch1 data from server or cache!');
        return [];
      }
    }
  }  

  saveWatch1(watch1list: Final24[]){
    localStorage.setItem('Wattch1', JSON.stringify(watch1list));

    //const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'}),
                     params: new HttpParams().append('table', 'watch1')};
    //this.http.delete(this.apiUrl + '/final24').subscribe(() => this.status = 'Delete successful');
    
    this.http.post<Final24[]>(this.apiUrl + '/final24-update', JSON.stringify(watch1list), options).subscribe();

    console.log("Saving Watch1 Data");

  }

  async getWatch2(): Promise<Final24[]> {
    // First try to load a fresh copy of the data from the API
    
    const options = {params: new HttpParams().append('table', 'watch2')};

    try {
      const response = await this.http.get<Final24[]>(this.apiUrl + '/final24',options).toPromise();
      localStorage.setItem('Watch2', JSON.stringify(response));
      return response as Final24[];
    } catch (e) {
      try {
        // Send the cached data
        return JSON.parse(localStorage.getItem('Watch2')!) as Final24[];
      } catch (err) {
        console.error('Could not load Watch2 data from server or cache!');
        return [];
      }
    }
  }  

  saveWatch2(watch2list: Final24[]){
    localStorage.setItem('Wattch2', JSON.stringify(watch2list));

    //const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'}),
                     params: new HttpParams().append('table', 'watch2')};
    //this.http.delete(this.apiUrl + '/final24').subscribe(() => this.status = 'Delete successful');
    
    this.http.post<Final24[]>(this.apiUrl + '/final24-update', JSON.stringify(watch2list), options).subscribe();

    console.log("Saving Watch2 Data");

  }


  // Get/Set Event for async pipe on Header Component

  setEvent(val: string) {
    this.globalEvent$.next(val);
  }

  getEvent() {
    return this.globalEvent$.asObservable();
  }

  // Get/Set Event for async pipe on Header Component

  setTime() {

    let now = new Date();
    let date = formatDate(now, 'MM/dd hh:mm a', 'en-US');
    console.log("Time: " + date);
    this.globalTime$.next(date);

  }

  getTime() {
    return this.globalTime$.asObservable();
  }



  getHistory(event:number){
    
    // First try to load a fresh copy of the data from the API
    this.http.get<CEA[]>(this.apiUrl + '/analysis195/'+event).subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.CEAReplay.next(response as CEA[]);
      // Might as well store it while we have it
      console.log("Getting Historical Data from Database");

      localStorage.setItem('CEA', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        console.log("Getting Data from Cache");
        this.CEAReplay.next(JSON.parse(localStorage.getItem('CEA')!) as CEA[]);
      } catch (err) {
        console.error('Could not load Analysis data from server or cache!');
      }
    });

    // First try to load a fresh copy of the data from the API
    this.http.get<Matches[]>(this.apiUrl + '/matchinfo/'+event).subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.MatchReplay.next(response as Matches[]);
      // Might as well store it while we have it
      localStorage.setItem('Matches', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.MatchReplay.next(JSON.parse(localStorage.getItem('Matches')!) as Matches[]);
      } catch (err) {
        console.error('Could not load Matches data from server or cache!');
      }
    });

    // First try to load a fresh copy of the data from the API
    this.http.get<Summary[]>(this.apiUrl + '/summary/'+event).subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.SummaryReplay.next(response as Summary[]);
      // Might as well store it while we have it
      localStorage.setItem('Summary', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.SummaryReplay.next(JSON.parse(localStorage.getItem('Summary')!) as Summary[]);
      } catch (err) {
        console.error('Could not load Summary data from server or cache!');
      }
    });

    // First try to load a fresh copy of the data from the API
    this.http.get<Teams[]>(this.apiUrl + '/pitdata/'+event).subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.TeamsReplay.next(response as Teams[]);
      // Might as well store it while we have it
      localStorage.setItem('Teams', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.TeamsReplay.next(JSON.parse(localStorage.getItem('Teams')!) as Teams[]);
      } catch (err) {
        console.error('Could not load Teams data from server or cache!');
      }
    });

    // First try to load a fresh copy of the data from the API
    this.http.get<Level2[]>(this.apiUrl + '/level2/'+event).subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.Level2Replay.next(response as Level2[]);
      // Might as well store it while we have it
      localStorage.setItem('Level2', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.Level2Replay.next(JSON.parse(localStorage.getItem('Level2')!) as Level2[]);
      } catch (err) {
        console.error('Could not load analysis types from server or cache!');
      }
    });

    // First try to load a fresh copy of the data from the API
    this.http.get<Checklist[]>(this.apiUrl + '/checklist/'+event).subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.CheckReplay.next(response as Checklist[]);
      // Might as well store it while we have it
      localStorage.setItem('Checklist', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.CheckReplay.next(JSON.parse(localStorage.getItem('Checklist')!) as Checklist[]);
      } catch (err) {
        console.error('Could not load Checklist from server or cache!');
      }
    });


    // First try to load a fresh copy of the data from the API
    this.http.get<CurrTeams[]>(this.apiUrl + '/currteam/'+event).subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.CurrTeamReplay.next(response as CurrTeams[]);
      // Might as well store it while we have it
      localStorage.setItem('CurrTeams', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.CurrTeamReplay.next(JSON.parse(localStorage.getItem('CurrTeams')!) as CurrTeams[]);
      } catch (err) {
        console.error('Could not load Current Teams data from server or cache!');
      }
    });

  }



  public getUserAccess(user: string, pass: string): Promise<any>{

    console.log("Getting Access Level for: " + user);

    //const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    const options = {params: new HttpParams().append('userName', user).append('userPass', pass)};

    // First try to load a fresh copy of the data from the API
    return this.http.get<Access[]>(this.apiUrl + '/access', options).toPromise();
    
  }

  saveListData(checklist: Checklist[]){
    //localStorage.setItem('StoredL2', JSON.stringify(level2));

    //const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    
    this.http.post<Checklist[]>(this.apiUrl + '/checklist-update', JSON.stringify(checklist), options).subscribe();

    console.log("Updating Checklist Records");

    let result = localStorage.getItem(('Checklist'));

    // console.log(result);


  }

}
