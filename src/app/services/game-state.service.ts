import { START_COUNT, COLORS } from './../models/constants.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  simon: string[] = [];
  player: string[] = [];
  count: number;
  state = new Subject<any>();

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
    this.simon = [];
    for (let i = 0; i < this.count; i++) {
      this.appendSimon();
    }
    this.setState();
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
    this.setState();
  }

  compareSimon(): boolean {
    for (let i = 0; i < this.player.length; i++) {
      if (this.player[i] !== this.simon[i]) {
        return false;
      }
    }

    if (this.player.length === this.simon.length) {
      this.updateGame();
    }
    return true;
  }

  updateGame(): void {
    this.appendSimon(true);
    this.player = [];
  }

  setState(): void {
    this.state.next({
      player: this.player,
      simon: this.simon,
      count: this.count,
    });
  }
}
