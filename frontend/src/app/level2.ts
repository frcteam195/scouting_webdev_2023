export class level2 {
    eventID: number;
    matchID: number;
    matchNum: number;
    ScouterID: number;
    scoutingStatus: number;
    synced2MS: number;
    team: string;
    teamMatchNum: number;
    allianceStationID: number;

constructor(eventID: number,
    matchID: number,
    matchNum: number,
    ScouterID: number,
    scoutingStatus: number,
    synced2MS: number,
    team: string,
    teamMatchNum: number,
    allianceStationID: number,){
    this.eventID=eventID;
    this.matchID=matchID;
    this.matchNum=matchNum;
    this.ScouterID=ScouterID;
    this.scoutingStatus=scoutingStatus;
    this.synced2MS=synced2MS;
    this.team=team;
    this.teamMatchNum=teamMatchNum;
    this.allianceStationID=allianceStationID;
}}