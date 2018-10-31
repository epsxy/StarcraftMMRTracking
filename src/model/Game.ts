export class Game {
    date: Date;
    race: string;
    opponentRace: string;
    mmr: number;
    opponentMmr: number;
    isWon: boolean = false;
    length: String;
    apm: number;
    spm: number;
    supplyBlock: String;
    spendingQuotient: number;

    constructor(date: Date,
        race: string, 
        opponentRace: string,
        mmr: number,
        opponentMmr: number,
        isWon: boolean = false,
        length: String,
        apm: number,
        spm: number,
        supplyBlock: String,
        spendingQuotient: number) {
        this.date = date;
        this.race = race;
        this.opponentRace = opponentRace;
        this.mmr = mmr;
        this.opponentMmr = opponentMmr;
        this.isWon = isWon;
        this.length = length;
        this.apm = apm;
        this.spm = spm;
        this.supplyBlock = supplyBlock;
        this.spendingQuotient = spendingQuotient;
    }
}