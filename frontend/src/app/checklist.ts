export class Checklist {
    listID: number;
    eventID: number;
    matchNum: number;
    taskID: number;
    scouterID: number;
    taskStatus: number;
    task: string;
    taskDesc: string;
    allianceStationID: number;
constructor
(   listID: number,
    eventID: number,
    matchNum: number,
    taskID: number,
    scouterID: number,
    taskStatus: number,
    task: string,
    taskDesc: string,
    allianceStationID: number
     ){
    this.listID=listID;
    this.eventID=eventID;
    this.matchNum=matchNum;
    this.taskID=taskID;
    this.scouterID=scouterID;
    this.taskStatus=taskStatus;
    this.task=task;
    this.taskDesc=taskDesc;
    this.allianceStationID=allianceStationID;
}}
