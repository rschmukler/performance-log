import now from 'performance-now';
import chalk from 'chalk';


const CHALK_COLORS = ['green', 'yellow', 'blue', 'magenta', 'cyan'];

export class PerformanceMonitor {
  constructor(name) {
    this._enabled = (new RegExp(name)).test(process.env.PERFORMANCE_LOG);
    if (!this._enabled) return;
    this._color = randomColor();
    this._name = name;
  }
  report(msg) {
    if (!this._enabled) return;
    console.log(this._color(`Performance:${this._name} - ${msg}`));
  }
  start() {
    this._startTime = now();
    this._lastRecord = this._startTime;

    this.report('Started');
  }
  end() {
    if (!this._enabled) return;
    var totalRunTime = now() - this._startTime;
    this.report(`Total run time: ${totalRunTime} ms`);
  }
}

function randomColor() {
  return chalk[CHALK_COLORS[Math.floor(Math.random() * CHALK_COLORS.length)]];
}

var test = new PerformanceMonitor('test');

test.start();
for (var i = 0; i < 10000000; ++i) {
  if (i % 90543 == 0) test.report('match');
}

test.end();
