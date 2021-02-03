import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-button',
  templateUrl: './game-button.component.html',
  styleUrls: ['./game-button.component.scss']
})
export class GameButtonComponent implements OnInit {
  @Input() color = '';
  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void{
    console.log(`${this.color} clicked`);
  }

}
