export class Types {
    AnalysisTypeID: number;
    AnalysisType: string;
    SortOrder: number;
    teamPickerOrder: number;
    matchReportOrder: number;
    snapShotOrder: number;
    Summary: string;

constructor(AnalysisTypeID: number,
    AnalysisType: string,
    SortOrder: number,
    teamPickerOrder: number,
    matchReportOrder: number,
    snapShotOrder: number,
    Summary: string ){
    this.AnalysisTypeID=AnalysisTypeID;
    this.AnalysisType=AnalysisType;
    this.SortOrder=SortOrder;
    this.teamPickerOrder=teamPickerOrder;
    this.matchReportOrder=matchReportOrder;
    this.snapShotOrder=snapShotOrder;
    this.Summary=Summary;
}}
