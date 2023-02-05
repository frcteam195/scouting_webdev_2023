export class Types {
    analysisType: string;
    analysisTypeID: number;
    developer: string;
    matchReport: number;
    robotSnapshot: number;
    summary: string;
    teamPicker: number;
    sortOrder: number;

constructor(analysisType: string,
    analysisTypeID: number,
    developer: string,
    matchReport: number,
    robotSnapshot: number,
    summary: string,
    teamPicker: number, 
    sortOrder: number){
    this.analysisType=analysisType;
    this.analysisTypeID=analysisTypeID;
    this.developer=developer;
    this.matchReport=matchReport;
    this.robotSnapshot=robotSnapshot;
    this.summary=summary;
    this.teamPicker=teamPicker;
    this.sortOrder = sortOrder;
}}
