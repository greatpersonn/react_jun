import './App.css';
import React, {useState, useEffect} from 'react';
import { interval, takeUntil, Subject, fromEvent, map, buffer, filter, debounceTime } from 'rxjs';

import DisplayStopwatch from './utility/DisplayStopwatch.js';
import BtnStopwatch from './utility/BtnStopwatch.js';


function App() {

  const [time, setTime] = useState(0);
  const [watchOn, setWatchOn] = useState(false);
  const [status, setStatus] = useState(0);

  const waitButton = document.querySelector('.btns_control-Wait');

  const unsubscribe = new Subject();

  useEffect(() => {
      interval(10)
      .pipe(takeUntil(unsubscribe))
      .subscribe(() => {
        if (watchOn) {
          setTime(val => val + 1);
        }
      });

      return () => {
        unsubscribe.next();
        unsubscribe.complete();
      };
  }, [watchOn]);

  const stopwatchStart = () => {
    setWatchOn(prevState => !prevState);
    setStatus(1);
    setTime(0);
  }

  const stopwatchStop = () => {
    const click$ = fromEvent(waitButton, 'click');
    const doubleClick$ = click$

    .pipe(
      buffer(click$.pipe(debounceTime(300))),
      map(clicks => clicks.length),
      filter(clicksLength => clicksLength >= 2)
    );

    doubleClick$.subscribe(_ => {
        if (time !== 0) {
          setWatchOn(false);
        }
        setStatus(2);
      })

  }

  const stopwatchReset = () => {
    setTime(0);
    setWatchOn(false);
    setStatus(0);
    setWatchOn(true);
    setStatus(1);
  }


  return (
    <div className="App">
       <main>
            <div class="main_container">
                <DisplayStopwatch   
                  time = {time} 
                />

                <BtnStopwatch 
                  start = {stopwatchStart}
                  stop = {stopwatchStop}
                  reset = {stopwatchReset}
                  status = {status}
                />

            </div>
        </main>
    </div>
  );
}

export default App;
