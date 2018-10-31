import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

const STORAGE_KEY = 'administration';
const DEFAULT_RACE = 'Protoss';

@Injectable()
export class AdministrationProvider {

  constructor(public storage: Storage) {
    console.log('Hello AdministrationProvider Provider');
  }

  setFavoriteRace(race: string): void {
    this.storage.set(STORAGE_KEY, race);
  }

  getFavoriteRace(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.storage.get(STORAGE_KEY)
        .then(race => {
          if (race) {
            resolve(race);
          }
          resolve(DEFAULT_RACE);
        })
        .catch(err => reject(err));
    })
  }
}
