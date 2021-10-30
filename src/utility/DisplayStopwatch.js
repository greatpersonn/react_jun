import React from 'react';

function displayStopwatch({time}) {
    return(
        <div class="container_content-stpw">
            <div class="stopwatch-hours">{('0' + Math.floor((time / (1000 * 60 * 60)) % 24)).slice(-2)}</div>
            <p>:</p>
            <div class="stopwatch-minutes">{('0' + Math.floor(time / 6000)).slice(-2)}</div>
            <p>:</p>
            <div class="stopwatch-seconds">{('0' + Math.floor((time / 100) % 60)).slice(-2)}</div>
        </div>
    );
}

export default displayStopwatch;