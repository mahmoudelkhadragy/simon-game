import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-button',
  templateUrl: './game-button.component.html',
  styleUrls: ['./game-button.component.scss'],
})
export class GameButtonComponent implements OnInit {
  @Input() color = '';
  @Input() active = false;
  @Output() guess: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  onClick(): void {
    this.guess.emit(this.color);
  }
}
