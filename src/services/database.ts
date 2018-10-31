import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Game } from '../model/Game';
import { v4 as uuid } from 'uuid';
import { SqliteBooleanDeserializer } from '../serializers/SqliteBooleanSerializer';


/**
 * @deprecated
 * Use GamesProvider instead
 */
@Injectable()
export class Database {

  options: any = {
    name: 'sc2.ranked.db',
    location: 'default',
    createFromLocation: 1
  }

  private db: SQLiteObject;

  constructor(private sqlite: SQLite,
    private booleanDeserializer: SqliteBooleanDeserializer) {
    this.connectToDb();
  }

  private connectToDb(): void {
    this.sqlite.create(this.options)
      .then((db: SQLiteObject) => {
        this.db = db;
        console.log('Database successfully created')
        this.drop();
      })
      .catch(e => console.log(JSON.stringify(e)));
  }

  private drop(): void {
    this.db.executeSql('DROP TABLE IF EXISTS games')
      .then(() => {
        console.log('Droped table games successfully');
        this.init();
      })
      .catch(e => {
        console.log('Error droping table');
        this.init();
      })
  }

  private init(): void {
    var sql = 'CREATE TABLE IF NOT EXISTS games' +
      '(id TEXT PRIMARY KEY, date TEXT, race TEXT, opponentRace TEXT, mmr NUMBER, opponentMmr NUMBER, isWon TEXT, ' +
      'length TEXT, apm NUMBER, spm NUMBER, supplyBlock TEXT, spendingQuotient NUMBER)';
    this.db.executeSql(sql, [])
      .then(() => {
        console.log('Executed SQL: ' + sql);
        this.fillDatabaseWithTestData();
      })
      .catch(e => console.log('Error in table creation: ' + JSON.stringify(e)));
  }

  private fillDatabaseWithTestData(): void {
    this.addMockGame('01/10/2018', 'Protoss', 'Zerg', 2300, 2500, false, '15:46', 145, 5.6, '00:56', 65);
    this.addMockGame('02/10/2018', 'Protoss', 'Terran', 2200, 2800, true, '15:46', 120, 2.6, '00:10', 75);
    this.addMockGame('02/10/2018', 'Protoss', 'Protoss', 2300, 2500, false, '15:46', 160, 1.5, '1:45', 40);
    this.addMockGame('03/10/2018', 'Zerg', 'Zerg', 2200, 2500, true, '15:46', 110, 3.7, '00:36', 51);
    this.addMockGame('03/10/2018', 'Zerg', 'Protoss', 2300, 2700, true, '15:46', 134, 8.6, '00:20', 81);
    this.addMockGame('03/10/2018', 'Protoss', 'Zerg', 2400, 2450, false, '15:46', 156, 4.2, '00:45', 90);
  }

  addMockGame(date: string, race: string, opponentRace: string, mmr: number, opponentMmr: number, isWon: boolean, length: string,
    apm: number, spm: number, supplyBlock: string, spendingQuotient: number): void {
    console.log('---- Adding game -----');
    var sql = "INSERT INTO games " +
      "(id, date, race, opponentRace, mmr, opponentMmr, isWon, length, apm, spm, supplyBlock, spendingQuotient) " +
      "VALUES ('" + uuid() + "','" + date + "','" + race + "','" + opponentRace + "','" + mmr + "','" + opponentMmr +
      "','" + isWon + "','" + length + "','" + apm + "','" + spm + "','" + supplyBlock + "','" +
      spendingQuotient + "')";

    this.db.executeSql(sql, [])
      .then(() => console.log('Added successfully'))
      .catch(e => console.log('Error: ' + JSON.stringify(e)));
  }

  addGame(game: Game): void {
    console.log('---- Adding game -----');
    var sql = "INSERT INTO games " +
      "(id, date, race, opponentRace, mmr, opponentMmr, isWon, length, apm, spm, supplyBlock, spendingQuotient) " +
      "VALUES ('" + uuid() + "','" + game.date + "','" + game.race + "','" + game.opponentRace + "','" + game.mmr + "','" + game.opponentMmr +
      "','" + game.isWon + "','" + game.length + "','" + game.apm + "','" + game.spm + "','" + game.supplyBlock + "','" +
      game.spendingQuotient + "')";

    this.db.executeSql(sql, [])
      .then(() => console.log('Added successfully'))
      .catch(e => console.log('Error: ' + JSON.stringify(e)));
  }

  getGames(): Promise<Game[]> {
    return new Promise((resolve, reject) => {
      var sql = `SELECT * FROM games`;
      this.db.executeSql(sql, [])
        .then((result) => {
          let games: Game[] = [];
          for (var i = 0; i < result.rows.length; i++) {
            console.log('Retrieving game: ' + result.rows.item(i).id)
            games.push(new Game(
              new Date(result.rows.item(i).date),
              result.rows.item(i).race,
              result.rows.item(i).opponentRace,
              result.rows.item(i).mmr,
              result.rows.item(i).opponentMmr,
              this.booleanDeserializer.fromDb(result.rows.item(i).isWon),
              result.rows.item(i).length,
              result.rows.item(i).apm,
              result.rows.item(i).spm,
              result.rows.item(i).supplyBlock,
              result.rows.item(i).spendingQuotient,
            ));
          }
          resolve(games);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  countGames(): Promise<Number> {
    return new Promise((resolve, reject) => {
      var sql = `SELECT COUNT(*) as count FROM games`;
      this.db.executeSql(sql, [])
        .then((result) => {
          resolve(result.rows.item(0).count);
        })
        .catch(e => {
          reject(e);
        })
    });
  }

  countGamesByRacePlayed(race: string): Promise<Number> {
    return new Promise((resolve, reject) => {
      var sql = `SELECT COUNT(*) as count FROM games WHERE race='${race}'`;
      this.db.executeSql(sql, [])
        .then((result) => {
          console.log('Resolving games count for Race: ' + race + ' -> ' + result.rows.item(0).count);
          resolve(result.rows.item(0).count);
        })
        .catch(e => {
          reject(e);
        })
    });
  }

  getApmEvolution(): Promise<Number[]> {
    return new Promise((resolve, reject) => {
      var sql = `SELECT apm FROM games`;
      this.db.executeSql(sql, [])
        .then((result) => {
          resolve(result);
        })
        .catch(e => {
          reject(e);
        })
    });
  }
}
