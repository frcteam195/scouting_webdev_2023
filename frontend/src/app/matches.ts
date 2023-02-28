export class Matches {
    actualTime: string;
    blue1: string;
    blue2: string;
    blue3: string;
    blueAutoPts: number;

    blueEndgameCSPts: number;
    blueLinkPts: number;
    blueTotalPts: number;
    blueTelePts: number;
    blueFouls: number;
    blueCoopertitionBonus: number;
    blueTechFouls: number;
    blueTotalCSPts: number;
    blueCoopGamePieceCount: number;
    blueActivationBonus: number;
    blueSustainabilityBonus: number;
    blueAutoMoveBonusPts: number;
    blueAutoGamePieces: number;
    blueAutoGamePiecePts: number;
    blueAutoCSPts: number;
    blueTeleGamePieces: number;
    blueTeleGamePiecePts: number;
    eventID	: number;
    matchID: number;
    matchNum: number;
    matchTime: string;
    red1: string;
    red2: string;
    red3: string ;
    redTeleGamePiecePts: number;
    redTeleGamePieces: number;
    redAutoCSPts: number;
    redAutoGamePiecePts: number;
    redAutoMoveBonusPts: number;
    redAutoGamePieces: number;
    redSustainabilityBonus: number;
    redCoopertitionBonus: number;
    redTotalCSPts: number;
    redCoopGamePieceCount: number;
    redActivationBonus: number;
    redAutoPts: number;
    redEndgameCSPts: number;
    redLinkPts: number;
    redTotalPts: number;
    redTelePts: number;
    redFouls: number;
    redTechFouls: number;

constructor(actualTime: string,
    blue1: string,
    blue2: string,
    blue3: string,
    blueTotalCSPts: number,
    blueLinkPts: number,
    blueCoopGamePieceCount: number,
    blueActivationBonus: number,
    blueSustainabilityBonus: number,
    blueAutoMoveBonusPts: number,
    blueAutoGamePieces: number,
    blueAutoGamePiecePts: number,
    blueAutoCSPts: number,
    blueTeleGamePieces: number,
    blueTeleGamePiecePts: number,
    blueAutoPts: number,
    blueCoopertitionBonus: number,
    blueEndgameCSPts: number,
    
    blueTotalPts: number,
    blueTelePts: number,
    blueFouls: number,
    blueTechFouls: number,
    eventID	: number,
    matchID: number,
    matchNum: number,
    matchTime: string,
    red1: string,
    red2: string,
    red3: string ,
    redAutoPts: number,
    redTeleGamePiecePts: number,
    redTeleGamePieces: number,
    redAutoCSPts: number,
    redAutoGamePiecePts: number,
    redAutoMoveBonusPts: number,
    redAutoGamePieces: number,
    redSustainabilityBonus: number,
    redCoopertitionBonus: number,
    redTotalCSPts: number,
    redLinkPts: number,
    redCoopGamePieceCount: number,
    redActivationBonus: number,
    redEndgameCSPts: number,
    redTotalPts: number,
    redTelePts: number,
    redFouls: number,
    redTechFouls: number
    ){
        this.actualTime=actualTime;
        this.blue1=blue1;
        this.blue2=blue2;
        this.blue3=blue3;
        this.blueTotalCSPts = blueTotalCSPts;
    this.blueCoopGamePieceCount= blueCoopGamePieceCount;
    this.blueActivationBonus= blueActivationBonus;
    this.blueSustainabilityBonus= blueSustainabilityBonus;
    this.blueAutoMoveBonusPts= blueAutoMoveBonusPts;
    this.blueAutoGamePieces= blueAutoGamePieces;
    this.blueAutoGamePiecePts= blueAutoGamePiecePts;
    this.blueAutoCSPts= blueAutoCSPts;
    this.blueTeleGamePieces= blueTeleGamePieces;
    this.blueTeleGamePiecePts = blueTeleGamePiecePts;
    this.blueCoopertitionBonus= blueCoopertitionBonus;
        this.blueAutoPts=blueAutoPts;
        this.blueEndgameCSPts=blueEndgameCSPts;
        this.blueLinkPts=blueLinkPts;
        this.blueTotalPts=blueTotalPts;
        this.blueTelePts=blueTelePts;
        this.blueFouls=blueFouls;
        this.blueTechFouls=blueTechFouls;
        this.eventID=eventID	;
        this.matchID=matchID;
        this.matchNum=matchNum;
        this.matchTime=matchTime;
        this.red1=red1;
        this.red2=red2;
        this.red3=red3;
        this.redAutoPts=redAutoPts;
        this.redEndgameCSPts=redEndgameCSPts;
        this.redLinkPts=redLinkPts;
        this.redTotalPts=redTotalPts;
        this.redTelePts=redTelePts;
        this.redFouls=redFouls;
        this.redTechFouls=redTechFouls;
        this.redTeleGamePiecePts = redTeleGamePiecePts;
    this.redTeleGamePieces = redTeleGamePieces;
    this.redAutoCSPts = redAutoCSPts;
    this.redAutoGamePiecePts= redAutoGamePiecePts;
    this.redAutoMoveBonusPts= redAutoMoveBonusPts;
    this.redAutoGamePieces = redAutoGamePieces;
    this.redSustainabilityBonus = redSustainabilityBonus;
    this.redCoopertitionBonus = redCoopertitionBonus;
    this.redTotalCSPts = redTotalCSPts;
    this.redLinkPts = redLinkPts;
    this.redCoopGamePieceCount= redCoopGamePieceCount;
    this.redActivationBonus = redActivationBonus;
       
}}
