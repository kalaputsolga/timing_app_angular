import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { TimerService } from '../services/timer.service';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
  private _playPauseStopUnsubscribe: any;

  start = 0;
  ticks = 0;

  minutesDisplay = 0;
  hoursDisplay = 0;
  secondsDisplay = 0;

  sub: Subscription;

  constructor(private _timerService: TimerService) { }

  ngOnInit() {
      this._playPauseStopUnsubscribe = this._timerService.playPauseStop$.subscribe((res: any) => this._playPauseStop(res));
  }

  ngOnDestroy() {
      this._playPauseStopUnsubscribe.unsubscribe();
  }

  private _playPauseStop(res: any) {
      if (res.play) {
          this._startTimer();
      } else if (res.pause) {
          this._pauseTimer();
      } else if (res.stop) {
          this._stopTimer();
      }
  }

  private _startTimer() {

      const timer: Observable<number> = Observable.timer(1, 1000);
      this.sub = timer.subscribe(
          t => {
              this.ticks = this.start + t;

              this.secondsDisplay = this._getSeconds(this.ticks);
              this.minutesDisplay = this._getMinutes(this.ticks);
              this.hoursDisplay = this._getHours(this.ticks);
          }
      );
  }

  private _pauseTimer() {
      this.start = ++this.ticks;
      if (this.sub) {
          this.sub.unsubscribe();
        }
  }

  private _stopTimer() {
      this.start = 0;
      this.ticks = 0;

      this.minutesDisplay = 0;
      this.hoursDisplay = 0;
      this.secondsDisplay = 0;

      if (this.sub) {
          this.sub.unsubscribe();
      }
  }

  private _getSeconds(ticks: number) {
      return this._pad(ticks % 60);
  }

  private _getMinutes(ticks: number) {
       return this._pad((Math.floor(ticks / 60)) % 60);
  }

  private _getHours(ticks: number) {
      return this._pad(Math.floor((ticks / 60) / 60));
  }

  private _pad(digit: any) {
      return digit <= 9 ? '0' + digit : digit;
  }
}