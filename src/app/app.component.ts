import { Component, OnInit } from '@angular/core';
import { PlayerMoves, Box, BoxInfo } from './Interfaces/game-parts';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent implements OnInit  {
  player:string ;
  result:string;
  moves:PlayerMoves[];
  boxes:Box[];
  activeGame:boolean;
  info:string = 'Next player: '

  gameSetup(){
    var rowNumber = -1;
    var colNumber = 0;
    this.activeGame = true;
    this.boxes = [];
    this.moves = [];
    this.player = 'X'
    this.result = '';
    this.info = 'Next player: ';
    for(var i=0; i<=8; i++){   
      if((i % 3) == 0){
        colNumber = 0;
      }else{
        colNumber++
      }
      this.boxes.push({
          boxNumber: i,
          column: colNumber,
          row: 0,
          value: '',
          disabled: false,
        }); 
      if((i % 3) == 0){
        rowNumber++
      }
      this.boxes[i].row = rowNumber;
    }
  }

  selectBox(boxInfo:BoxInfo){
    this.activeGame = false;
    this.boxes[boxInfo.boxNumber].value = this.player;
    if(!this.hasWinner()){
      this.player = this.player === 'X' ? 'O' : 'X';  
      this.moves.push({
        Detail:'Goto move #' + (this.moves.length+1),
        MoveNumber: this.moves.length,
        MoveValue: this.boxes[boxInfo.boxNumber].value,
        Progress:JSON.parse(JSON.stringify(this.boxes))
      });
    }
  }
  
  ngOnInit() {
    this.gameSetup();
  }

  newGame(){
    this.gameSetup();
  }

  gotoMove(moveNumber:number){
    this.moves.splice(moveNumber+1,this.moves.length+1);
    this.boxes = JSON.parse(JSON.stringify(this.moves[moveNumber].Progress));
    this.player = this.moves[moveNumber].MoveValue === 'X' ? 'O' : 'X';  
    this.result = '';
    this.info = 'Next player: ';
  }

  hasWinner(): boolean{
    if( //check vertically
      (this.boxes[0].value === this.player && this.boxes[1].value === this.player && this.boxes[2].value === this.player)
    || (this.boxes[3].value === this.player && this.boxes[4].value === this.player && this.boxes[5].value === this.player)
    || (this.boxes[6].value === this.player && this.boxes[7].value === this.player && this.boxes[8].value === this.player)
      //check horizontally
    || (this.boxes[0].value === this.player && this.boxes[3].value === this.player && this.boxes[6].value === this.player)
    || (this.boxes[1].value === this.player && this.boxes[4].value === this.player && this.boxes[7].value === this.player)
    || (this.boxes[2].value === this.player && this.boxes[5].value === this.player && this.boxes[8].value === this.player)
      //check diagnoally
    || (this.boxes[0].value === this.player && this.boxes[4].value === this.player && this.boxes[8].value === this.player)
    || (this.boxes[6].value === this.player && this.boxes[4].value === this.player && this.boxes[2].value === this.player)
      ){
      this.result = 'Player "' + this.player + '" has won !';
      this.player = 'Game Over';
      this.info = '';
      this.boxes.forEach(item => { item.disabled = true});
      return true;
    } else if 
        (this.boxes[0].value !== '' && this.boxes[1].value !== '' && this.boxes[2].value !== '' &&
        this.boxes[3].value !== '' && this.boxes[4].value !== '' && this.boxes[5].value !== '' &&
        this.boxes[6].value !== '' && this.boxes[7].value !== '' && this.boxes[8].value !== ''
        ){
        this.player = 'Game Over';
        this.info = '';
        this.result = 'It\'s a draw !';
        return true;
    }
  }
}