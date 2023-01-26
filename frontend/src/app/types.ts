export class Types {
    analysisTypeID: number;
    analysisType: string;
    teamPickerOrder: number;
    matchReportOrder: number;
    snapshotOrder: number;
    developer: string;
    summary: string;

constructor(analysisTypeID: number,
    analysisType: string,
    teamPickerOrder: number,
    matchReportOrder: number,
    snapshotOrder: number,
    developer: string ,
    summary: string ){
    this.analysisTypeID=analysisTypeID;
    this.analysisType=analysisType;
    this.teamPickerOrder=teamPickerOrder;
    this.matchReportOrder=matchReportOrder;
    this.snapshotOrder=snapshotOrder;
    this.developer=developer;
    this.summary=summary;
}}
