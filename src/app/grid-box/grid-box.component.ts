import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Box, BoxInfo } from './../Interfaces/game-parts';

@Component({
  selector: 'app-grid-box',
  templateUrl: './grid-box.component.html',
  styleUrls: [ './../app.component.css' ]
})

export class GridBoxComponent {
  @Input() row: number;
  @Input() column: number;
  @Output() submit: EventEmitter<BoxInfo> = new EventEmitter<BoxInfo>();
  @Input() box:Box;

  selectBox(boxNumber:number, row:number, column:number):void{
    this.box.disabled = true;
    this.submit.emit({boxNumber: boxNumber, row: row, column: column});
  }

  constructor() { }
}