import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import { Game } from '../../model/Game';
import { GameDeserializer } from '../../model/GameDeserializer';

const STORAGE_KEY = 'games';

@Injectable()
export class GamesProvider {

  constructor(public storage: Storage, public deserializer: GameDeserializer) {
    console.log('Hello GamesProvider Provider');
  }

  addGame(game: Game): void {
    this.getGames().then(games => {
      if (games) {
        let newGames = games;
        newGames.push(game);
        console.log('Saving games: ' + newGames);
        this.storage.set(STORAGE_KEY, JSON.stringify(newGames));
      } else {
        console.log('Saving game: ' + game);
        this.storage.set(STORAGE_KEY, [JSON.stringify(game)]);
      }
    });
  }

  getGames(): Promise<Game[]> {
    return new Promise((resolve, reject) => {
      this.storage.get(STORAGE_KEY)
        .then(json => {
          if(json && JSON.parse(json)) {
            let parsed = JSON.parse(json);
            let games = [];
            parsed.forEach(element => {
              games.push(this.deserializer.deserialize(element));
            });
            resolve(games);
          }
          resolve([]);
        })
        .catch(err => {
          reject(err);
        });
    });

  }
}
