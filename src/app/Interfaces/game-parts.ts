export interface Box {
  boxNumber:number,
  row:number,
  column:number,
  value:string,
  disabled:boolean
}
export interface PlayerMoves {
  Detail:string,
  MoveNumber:number,
  MoveValue: string,
  Progress:Box[],
}
export interface BoxInfo{
  boxNumber: number,
  row:number,
  column:number
}


