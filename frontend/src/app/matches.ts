export class Matches {
    blueChrgZoneRP: number
    blueEndGmPts: number;
    BlueScore: number;
    BlueTeam1: string;
    BlueTeam2: string;
    BlueTeam3: string; 
    blueTelePts: number;
    EventID: number;
    MatchID: number;
    MatchNum: number;
    blueLinksRP:number;
    redLinksRP: number; 
    RedHangarPoints: number;
    redChrgZoneRP: number;
    RedScore: number;
    RedTeam1: string;
    RedTeam2: string;
    RedTeam3: string;
    redTelePts: number;
    redAutoPts: number;
    blueAutoPts: number;
    MatchTime: string;
    ActualTime: string;

constructor(blueChrgZoneRP: number,
    blueEndGmPts: number,
    BlueScore: number,
    BlueTeam1: string,
    BlueTeam2: string,
    BlueTeam3: string, 
    blueTelePts: number,
    EventID: number,
    MatchID: number,
    MatchNum: number,
    redLinksRP: number, 
    blueLinksRP:number,
    RedHangarPoints: number,
    redChrgZoneRP: number,
    RedScore: number,
    RedTeam1: string,
    RedTeam2: string,
    RedTeam3: string,
    redTelePts: number,
    redAutoPts: number,
    blueAutoPts: number,
    MatchTime: string,
    ActualTime: string ){
        this.blueEndGmPts=blueEndGmPts;
        this.BlueScore=BlueScore;
        this.BlueTeam1=BlueTeam1;
        this.BlueTeam2=BlueTeam2;
        this.BlueTeam3=BlueTeam3; 
        this.blueTelePts=blueTelePts;
        this.EventID=EventID;
        this.MatchID=MatchID;
        this.MatchNum=MatchNum;
        this.redLinksRP=redLinksRP; 
        this.blueLinksRP=blueLinksRP
        this.RedHangarPoints=RedHangarPoints;
        this.redChrgZoneRP=redChrgZoneRP;
        this.blueChrgZoneRP=blueChrgZoneRP
        this.RedScore=RedScore;
        this.RedTeam1=RedTeam1;
        this.RedTeam2=RedTeam2;
        this.RedTeam3=RedTeam3;
        this.redTelePts=redTelePts;
        this.redAutoPts=redAutoPts;
        this.blueAutoPts=blueAutoPts;
        this.MatchTime=MatchTime;
        this.ActualTime=ActualTime;
}}
