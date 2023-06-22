import { Component, OnInit } from '@angular/core';

interface Row {
  result: number
}

@Component({
  selector: 'app-rechenschieber',
  templateUrl: './rechenschieber.component.html',
  styleUrls: ['./rechenschieber.component.sass']
})
export class RechenschieberComponent implements OnInit {

  showNumbers = true;
  balls: number[] = [];
  rows: Row[] = [];

  constructor() { 
    this.balls = Array(10).fill(0,0).map((x,i) => i); // [0,1,2,3,4,5,6,7,8,9]
    this.reset();
  }

  ngOnInit(): void {

  }

  updateRow(row: number, result: number ) {
    this.rows[row].result = result;
  }

  addRow(result = 5) {
    this.rows.push({ result });
  }

  ballIsLeft(row: Row, i: number): Boolean {
    return row.result > i;
  }

  ballIsRight(row: Row, i: number): Boolean {
    return row.result <= i;
  }

  getBallColor(i: number) : string {
    return i <= 4 ? 'red' : 'blue';
  }

  setResult(row: Row, result: number) {
    row.result = result;
  }

  getResultLeft(): number {
    let total = 0;
    for (const row of this.rows) {
      total += row.result;
    }
    return total;
  }

  getResultRight(): number {
    let total = 0;
    for (const row of this.rows) {
      total += 10 - row.result;
    }
    return total;
  }

  reset() {
    this.rows = [];
    this.addRow();
  }

  toggleNumbers() {
    this.showNumbers = !this.showNumbers;
  }
}
