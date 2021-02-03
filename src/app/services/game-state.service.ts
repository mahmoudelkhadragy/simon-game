import { START_COUNT, COLORS } from './../models/constants.model';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  simon: string[] = [];
  player: string[] = [];
  count: number;

  constructor() {
    this.count = START_COUNT;
  }

  private get randomColor(): string {
    return COLORS[Math.floor(Math.random() * 4)];
  }

  appendSimon(increament: boolean = false): void {
    if (increament) {
      this.count++;
    }
    this.simon.push(this.randomColor);
  }

  generateSimon(): string[] {
    for (let i = 0; i < this.count; i++) {
      this.appendSimon();
    }

    return this.simon;
  }

  restartSimon(): string[] {
    this.count = START_COUNT;
    return this.generateSimon();
  }

  playerGuess(val: string): void {
    this.player.push(val);
    // check player guess
    if (!this.compareSimon()) {
      this.player = [];
    }
  }

  compareSimon(): boolean {
    for (let i = 0; i < this.player.length; i++) {
      if (this.player[i] !== this.simon[i]) {
        return false;
      }
    }
    return true;
  }
}
