export class Types {
    analysisType: string;
    analysisTypeID: number;
    developer: string;
    matchReportOrder: number;
    snapshotOrder: number;
    summary: string;
    teamPickerOrder: number;

constructor(analysisType: string,
    analysisTypeID: number,
    developer: string,
    matchReportOrder: number,
    snapshotOrder: number,
    summary: string,
    teamPickerOrder: number ){
    this.analysisType=analysisType;
    this.analysisTypeID=analysisTypeID;
    this.developer=developer;
    this.matchReportOrder=matchReportOrder;
    this.snapshotOrder=snapshotOrder;
    this.summary=summary;
    this.teamPickerOrder=teamPickerOrder;
}}
