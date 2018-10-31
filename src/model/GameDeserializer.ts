import { Game } from "./Game";

export class GameDeserializer {
    public deserialize(json: Object): Game {
        return new Game(
            new Date(json['date']),
            json['race'],
            json['opponentRace'],
            json['mmr'],
            json['opponentMmr'],
            json['isWon'],
            json['length'],
            json['apm'],
            json['spm'],
            json['supplyBlock'],
            json['spendingQuotient']
        );
    }
}