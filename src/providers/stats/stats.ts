import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GamesProvider } from '../games/games';

@Injectable()
export class StatsProvider {

  constructor(public gamesProvider: GamesProvider) {
    console.log('Hello StatsProvider Provider');
  }

  getTotalGamesCount(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.gamesProvider.getGames()
        .then(games => {
          if (games) {
            resolve(games.length);
          }
          resolve(0);
        }).catch(err => {
          reject(err);
        })
    })
  }

  getGamesCountByRace(race: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.gamesProvider.getGames()
        .then(games => {
          if (games) {
            resolve(games.filter(g => g.race === race).length);
          }
          resolve(0);
        }).catch(err => {
          reject(err);
        })
    })
  }

  getWinrateByMatchup(race: string, opponentRace: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.gamesProvider.getGames()
        .then(games => {
          if (games) {
            let matchupGames = games.filter(g => (g.race === race && g.opponentRace === opponentRace));
            let matchupGamesWon = matchupGames.filter(g => g.isWon);
            if(matchupGames.length === 0) {
              reject('No games played yet');
            } else {
              resolve(100*(matchupGamesWon.length / matchupGames.length));
            }
          }
          reject('No games uploaded yet');
        }).catch(err => {
          reject(err);
        })
    })
  }
}
