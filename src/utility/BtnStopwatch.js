import React from 'react';

function controlStopwatch({start, stop, reset, status}) {
    return(
        <div class="container_content-btns">
                <button class="btns_control-StartStop" onClick={start}>Start / Stop</button>
                <button class="btns_control-Wait" onClick={stop}>Wait</button>
                <button class="btns_control-Reset" onClick={reset}>Reset</button>
        </div>
    );
}

export default controlStopwatch;