import { G } from "@angular/cdk/keycodes";

export class Teams {
    buddyClimb: Number;
    buildComments: Number;
    buildType: Number;
    buildQuality: Number;
    centerGravity: Number;
    driveBase: Number;
    driveTypeID: Number;
    electricalQuality: Number;
    electricalComments: Number;
    eventID: Number;
    generalComments: Number;
    height: Number;
    intakeType: Number;
    manupulator: Number;
    motorType: Number;
    robotLength: Number;
    robotdurability: Number;
    team: String;
    width: Number;
    
constructor(
    buddyClimb: Number,
    buildComments: Number,
    buildType: Number,
    buildQuality: Number,
    centerGravity: Number,
    driveBase: Number,
    driveTypeID: Number,
    electricalQuality: Number,
    electricalComments: Number,
   eventID: Number,
   generalComments: Number,
   height: Number,
    intakeType: Number,
    manupulator: Number,
    motorType: Number,
    robotLength: Number,
    robotdurability: Number,
    team: String,
    width: Number,
   
    ){
this.buddyClimb = buddyClimb;
this.buildComments = buildComments;
this.buildType = buildType;
this.buildQuality = buildQuality;
this.centerGravity = centerGravity;
   this.driveBase = driveBase
    this.driveTypeID = driveTypeID;
    this.electricalQuality = electricalQuality;
    this.electricalComments = electricalComments;
    this.eventID = eventID;
    this.intakeType = intakeType;
    this.generalComments = generalComments;
    this.height = height;
    this.motorType = motorType;
    this.manupulator = manupulator;
    this.robotLength = robotLength;
    this.robotdurability= robotdurability;
    this.team = team
    this.width = width;
    
}}

