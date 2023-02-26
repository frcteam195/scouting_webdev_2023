export class Summary {
    autoGamePiecesMean: number;
    autoGamePiecesMedian: number; 
    autoGamePiecesFormat: number;
    autoRampMean: number;
    autoRampMedian: number;
    autoRampFormat: number;
    autoScoreMean: number;
    autoScoreMedian: number;
    autoScoreFormat: number;
    eventID: number;
    rampMean: number;
    rampMedian: number;
    rampFormat: number;
    team: string;
    teleCommunityMean: number;
    teleCommunityMedian: number;
    teleCommunityFormat: number;
    teleHighMean: number;
    teleHighMedian: number;
    teleHighFormat: number;
    teleLZPickupMean: number;
    teleLZPickupMedian: number;
    teleLZPickupFormat: number;
    teleLowMean: number;
    teleLowMedian: number;
    teleLowFormat: number;
    teleMidMean: number;
    teleMidMedian: number;
    teleMidFormat: number;
    teleTotalMean: number;
    teleTotalMedian: number;
    teleTotalFormat: number;
  
  constructor(
    autoGamePiecesMean: number,
    autoGamePiecesMedian: number,
    autoGamePiecesFormat: number,
    autoRampMean: number,
    autoRampMedian: number,
    autoRampFormat: number,
    autoScoreMean: number,
    autoScoreMedian: number,
    autoScoreFormat: number,
    eventID: number,
    rampMean: number,
    rampMedian: number,
    rampFormat: number,
    team: string,
    teleCommunityMean: number,
    teleCommunityMedian: number,
    teleCommunityFormat: number,
    teleHighMean: number,
    teleHighMedian: number,
    teleHighFormat: number,
    teleLZPickupMean: number,
    teleLZPickupMedian: number,
    teleLZPickupFormat: number,
    teleLowMean: number,
    teleLowMedian: number,
    teleLowFormat: number,
    teleMidMean: number,
    teleMidMedian: number,
    teleMidFormat: number,
    teleTotalMean: number,
    teleTotalMedian: number,
    teleTotalFormat: number,
    ){
        this.autoGamePiecesMean = autoGamePiecesMean;
        this.autoGamePiecesMedian = autoGamePiecesMedian;
        this.autoGamePiecesFormat = autoGamePiecesFormat;
        this.autoRampMean = autoRampMean;
        this.autoRampMedian = autoRampMedian;
        this.autoRampFormat = autoRampFormat;
        this.autoScoreMean = autoScoreMean
        this.autoScoreMedian = autoScoreMedian;
        this.autoScoreFormat = autoScoreFormat;
        this.eventID = eventID;
        this.rampMean = rampMean;
        this.rampMedian = rampMedian;
        this.rampFormat = rampFormat;
        this.team = team;
        this.teleCommunityMean = teleCommunityMean;
        this.teleCommunityMedian = teleCommunityMedian;
        this.teleCommunityFormat = teleCommunityFormat;
        this.teleHighMean = teleHighMean;
        this.teleHighMedian = teleHighMedian;
        this.teleHighFormat = teleHighFormat;
        this.teleLZPickupMean = teleLZPickupMean;
        this.teleLZPickupMedian = teleLZPickupMedian;
        this.teleLZPickupFormat = teleLZPickupFormat;
        this.teleLowMean = teleLowMean;
        this.teleLowMedian = teleLowMedian;
        this.teleLowFormat = teleLowFormat;
        this.teleMidMean = teleMidMean;
        this.teleMidMedian = teleMidMedian;
        this.teleMidFormat = teleMidFormat;
        this.teleTotalMean = teleTotalMean;
        this.teleTotalMedian = teleTotalMedian;
        this.teleTotalFormat = teleTotalFormat;
    }}