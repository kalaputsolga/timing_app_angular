import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  timing = "00:00:00";
  constructor() { }

  ngOnInit() {
  }

  startStopClick () {
    console.log("YOU CLICKED ON START/STOP BUTTON!");
  }

  waitClick () {
    console.log("YOU CLICKED ON WAIT BUTTON!");
  }

  resetClick () {
    console.log("YOU CLICKED ON RESET BUTTON!");
  }
}
