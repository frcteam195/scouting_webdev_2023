export class Matches {
    actualTime: number;
    blue1: string;
    blue2: string;
    blue3: string;
    blueAutoPts: number;
    blueChrgZoneRP: number;
    blueEndGmPts: number;
    blueLinksRP: number;
    blueScore: number;
    blueTelePts: number;
    eventID	: number;
    matchID: number;
    matchNum: number;
    matchTime: number;
    red1: string;
    red2: string;
    red3: string ;
    redAutoPts: number;
    redChrgZoneRP: number;
    redEndGmPts: number;
    redLinksRP: number;
    redScore: number;
    redTelePts: number;

constructor(actualTime: number,
    blue1: string,
    blue2: string,
    blue3: string,
    blueAutoPts: number,
    blueChrgZoneRP: number,
    blueEndGmPts: number,
    blueLinksRP: number,
    blueScore: number,
    blueTelePts: number,
    eventID	: number,
    matchID: number,
    matchNum: number,
    matchTime: number,
    red1: string,
    red2: string,
    red3: string ,
    redAutoPts: number,
    redChrgZoneRP: number,
    redEndGmPts: number,
    redLinksRP: number,
    redScore: number,
    redTelePts: number
    ){
        this.actualTime=actualTime;
        this.blue1=blue1;
        this.blue2=blue2;
        this.blue3=blue3;
        this.blueAutoPts=blueAutoPts;
        this.blueChrgZoneRP=blueChrgZoneRP;
        this.blueEndGmPts=blueEndGmPts;
        this.blueLinksRP=blueLinksRP;
        this.blueScore=blueScore;
        this.blueTelePts=blueTelePts;
        this.eventID	=eventID	;
        this.matchID=matchID;
        this.matchNum=matchNum;
        this.matchTime=matchTime;
        this.red1=red1;
        this.red2=red2;
        this.red3=red3;
        this.redAutoPts=redAutoPts;
        this.redChrgZoneRP=redChrgZoneRP;
        this.redEndGmPts=redEndGmPts;
        this.redLinksRP=redLinksRP;
        this.redScore=redScore;
        this.redTelePts=redTelePts;
       
}}
