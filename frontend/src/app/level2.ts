export class Level2 {
    matchNum: number;
    team: string;
    commentOff: string;
    commentDef: string;
    goodOffBot: String;
    goodDefBot: String;

constructor(matchNum: number,
    team: string,
    commentOff: string,
    commentDef: string,
    goodOffBot: String,
    goodDefBot: String,){
    this.matchNum=matchNum;
    this.team=team;
    this.commentOff=commentOff;
    this.commentDef=commentDef;
    this.goodOffBot = goodOffBot;
    this.goodDefBot = goodDefBot;
}}