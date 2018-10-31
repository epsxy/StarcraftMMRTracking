import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Game } from '../../model/Game';
import { GamesProvider } from '../../providers/games/games';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[]
  games: Game[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public gamesProvider: GamesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');
    this.gamesProvider.getGames()
      .then(games => {
        this.games = games
        console.log(games);
      })
      .catch(e => console.log(e));
  }
}
