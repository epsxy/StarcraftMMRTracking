import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Game } from '../../model/Game';
import { GamesProvider } from '../../providers/games/games';


@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {
  date: Date;
  race: string;
  opponentRace: string;
  mmr: number;
  opponentMmr: number;
  isWon: boolean = false;
  length: string = '00:00:00';
  apm: number;
  spm: number;
  supplyBlock: string = '00:00';
  spendingQuotient: number;

  isFormValid: boolean = false;
  saved: string = '';
  game: Game;
  res: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, 
    public gamesProvider: GamesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');
  }

  validateForm(): void {
    this.isFormValid = false;
    if (this.date
      && this.race
      && this.opponentRace
      && this.mmr
      && this.opponentMmr
      && this.length
      && this.apm
      && this.spm
      && this.supplyBlock
      && this.spendingQuotient) {
      this.isFormValid = true;
    }
  }

  isButtonDisabled(): boolean {
    return !this.isFormValid;
  }

  saveGame(): void {
    let game = new Game(
      this.date,
      this.race,
      this.opponentRace,
      this.mmr,
      this.opponentMmr,
      this.isWon,
      this.length,
      this.apm,
      this.spm,
      this.supplyBlock,
      this.spendingQuotient
    );
    this.gamesProvider.addGame(game);
    this.clearForm();
  }

  clearForm(): void {
    this.date = null;
    this.race = null;
    this.opponentRace = null;
    this.isWon = false;
    this.mmr = null;
    this.opponentMmr = null;
    this.length = '00:00:00';
    this.apm = null;
    this.spm = null;
    this.supplyBlock = '00:00';
    this.spendingQuotient = null;
  }
}
