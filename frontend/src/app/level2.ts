export class Level2 {
    matchNum: number;
    scoutingStatus: number;
    team: string;
    commentOff: string;
    commentDef: string;

constructor(matchNum: number,
    scoutingStatus: number,
    team: string,
    commentOff: string,
    commentDef: string,){
    this.matchNum=matchNum;
    this.scoutingStatus=scoutingStatus;
    this.team=team;
    this.commentOff=commentOff;
    this.commentDef=commentDef;
}}