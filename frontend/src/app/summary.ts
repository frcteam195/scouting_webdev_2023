export class Summary {
    autoGamePiecesMean: number;
    autoGamePiecesMedian: number;
    autoRampMean: number;
    autoRampMedian: number;
    autoScoreMean: number;
    autoScoreMedian: number;
    eventID: number;
    rampMean: number;
    rampMedian: number;
    team: string;
    teleCommunityMean: number;
    teleCommunityMedian: number;
    teleHighMean: number;
    teleHighMedian: number;
    teleLZPickupMean: number;
    teleLZPickupMedian: number;
    teleLowMean: number;
    teleLowMedian: number;
    teleMidMean: number;
    teleMidMedian: number;
    teleTotalMean: number;
    teleTotalMedian: number;
  
  constructor(
    autoGamePiecesMean: number,
    autoGamePiecesMedian: number,
    autoRampMean: number,
    autoRampMedian: number,
    autoScoreMean: number,
    autoScoreMedian: number,
    eventID: number,
    rampMean: number,
    rampMedian: number,
    team: string,
    teleCommunityMean: number,
    teleCommunityMedian: number,
    teleHighMean: number,
    teleHighMedian: number,
    teleLZPickupMean: number,
    teleLZPickupMedian: number,
    teleLowMean: number,
    teleLowMedian: number,
    teleMidMean: number,
    teleMidMedian: number,
    teleTotalMean: number,
    teleTotalMedian: number,
    ){
        this.autoGamePiecesMean = autoGamePiecesMean;
        this.autoGamePiecesMedian = autoGamePiecesMedian;
        this.autoRampMean = autoRampMean;
        this.autoRampMedian = autoRampMedian;
        this.autoScoreMean = autoScoreMean
        this.autoScoreMedian = autoScoreMedian;
        this.eventID = eventID;
        this.rampMean = rampMean;
        this.rampMedian = rampMedian;
        this.team = team;
        this.teleCommunityMean = teleCommunityMean;
        this.teleCommunityMedian = teleCommunityMedian;
        this.teleHighMean = teleHighMean;
        this.teleHighMedian = teleHighMedian;
        this.teleLZPickupMean = teleLZPickupMean;
        this.teleLZPickupMedian = teleLZPickupMedian;
        this.teleLowMean = teleLowMean;
        this.teleLowMedian = teleLowMedian;
        this.teleMidMean = teleMidMean;
        this.teleMidMedian = teleMidMedian;
        this.teleTotalMean = teleTotalMean;
        this.teleTotalMedian = teleTotalMedian;
    }}