import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameStateService } from './../../services/game-state.service';
import { sleep } from './../../models/constants.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  stateSub = new Subscription();
  count = 0;
  colors: any = {
    red: false,
    blue: false,
    green: false,
    yellow: false,
  };
  constructor(private game: GameStateService) {}

  ngOnInit(): void {
    this.stateSub = this.game.state.subscribe((state) => {
      console.log(state);
      if (this.count !== state.count) {
        this.count = state.count;
        setTimeout(() => {
          this.teasePlayer(state.simon);
        }, 800);
      }
    });
    this.game.generateSimon();
  }

  playerColorGuess(color: string): void {
    this.game.playerGuess(color);
    console.log(color);
  }

  async teasePlayer(simon: string[]): Promise<void> {
    for (const color of simon) {
      this.colors[color] = true;
      await sleep(500);
      this.colors[color] = false;
      await sleep(500);
    }
  }

  ngOnDestroy(): void {
    this.stateSub.unsubscribe();
  }
}
