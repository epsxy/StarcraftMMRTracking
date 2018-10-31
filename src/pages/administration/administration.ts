import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdministrationProvider } from '../../providers/administration/administration';


@IonicPage()
@Component({
  selector: 'page-administration',
  templateUrl: 'administration.html',
})
export class AdministrationPage {

  race: string;

  isDefaultProtossDisabled: boolean = false;
  isDefaultZergDisabled: boolean = false;
  isDefaultTerranDisabled: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public adminProvider: AdministrationProvider) {
    adminProvider.getFavoriteRace().then(race => {
      this.race = race;
      this.handleRaceButtons();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdministrationPage');
  }

  private handleRaceButtons(): void {
    this.isDefaultProtossDisabled = false;
    this.isDefaultZergDisabled = false;
    this.isDefaultTerranDisabled = false;
    switch (this.race) {
      case 'Protoss':
        this.isDefaultProtossDisabled = true;
        break;
      case 'Zerg':
        this.isDefaultZergDisabled = true;
        break;
      case 'Terran':
        this.isDefaultTerranDisabled = true;
        break;
    }
  }

  selectDefaultRace(race: string): void {
    this.race = race; 
    this.adminProvider.setFavoriteRace(race);
    this.handleRaceButtons();
  }
}
