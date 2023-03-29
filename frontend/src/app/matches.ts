export class Matches {
    blue1: string;
    blue2: string;
    blue3: string;
    matchNum: number;
    red1: string;
    red2: string;
    red3: string ;
    SBredPredAuto: string;
    SBbluePredAuto: string;
    SBredPredTele: string;
    SBbluePredTele: string;
    SBredPredEndgame: string;
    SBbluePredEndgame: string;
    SBredPredScore: string;
    SBbluePredScore: string;
    SBredWinProb: string;
    SBblueWinProb: string;
constructor(actualTime: string,
    blue1: string,
    blue2: string,
    blue3: string,
    matchNum: number,
    red1: string,
    red2: string,
    red3: string,
    SBredPredAuto: string,
    SBbluePredAuto: string,
    SBredPredTele: string,
    SBbluePredTele: string,
    SBredPredEndgame: string,
    SBbluePredEndgame: string,
    SBredPredScore: string,
    SBbluePredScore: string,
    SBredWinProb: string,
    SBblueWinProb: string
    ){
        this.blue1=blue1;
        this.blue2=blue2;
        this.blue3=blue3;
        this.matchNum=matchNum;
        this.red1=red1;
        this.red2=red2;
        this.red3=red3;   
        this.SBredPredAuto=SBredPredAuto;   
        this.SBbluePredAuto=SBbluePredAuto; 
        this.SBredPredTele=SBredPredTele;   
        this.SBbluePredTele=SBbluePredTele; 
        this.SBredPredEndgame=SBredPredEndgame;   
        this.SBbluePredEndgame=SBbluePredEndgame; 
        this.SBredPredScore=SBredPredScore;   
        this.SBbluePredScore=SBbluePredScore; 
        this.SBredWinProb=SBredWinProb;   
        this.SBblueWinProb=SBblueWinProb; 
}}
