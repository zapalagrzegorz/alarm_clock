
document.addEventListener('DOMContentLoaded', () => {
    (() => {
        var Howl = require('../../node_modules/howler/dist/howler.core.min.js');

        /*********** variables ********************/
        let secs = document.querySelector('#sec');
        let mins = document.querySelector('#mins');
        let separator = document.querySelector('#separator');
        let intId = 0;
        // for audio files see http://soundbible.com/2142-FogHorn-Barge.html
        let sound = new Howl.Howl({
            src: ['../dev/audio/foghorn-daniel_simon.webm', 'foghorn-daniel_simon.mp3'],
            loop: true
        });


        /************* Methods *************/
        function setClock (e) {
            function start () {
                let secPointer;
                intId = setInterval(function timer () {
                    secPointer = Number(secs.textContent);
                    secPointer -= 1;
                    if (secPointer === -1) {
                        mins.textContent = Number(mins.textContent) - 1;
                        if (mins.textContent === '-1') {
                            mins.textContent = 0;
                            clearInterval(intId);
                            intId = 0;
                            sound.play();
                            return;
                        }
                        secs.textContent = secPointer = 59;
                    }
                    (secs.textContent % 2 === 1) ? separator.style.visibility = 'visible' : separator.style.visibility = 'hidden';
                    secs.textContent = secPointer;
                }, 1000);
            }

            switch (e.target.classList[0]) {
            case 'reset':
                clearInterval(intId);
                intId = 0;
                secs.textContent = 0;
                mins.textContent = 0;
                sound.stop();
                break;
            case 'stop':
                clearInterval(intId);
                intId = 0;
                sound.stop();
                break;
            case 'addMins':
                if (Number(mins.textContent) + 1 < 60) {
                    mins.textContent = Number(mins.textContent) + 1;
                }
                break;
            case 'minMins':
                if (Number(mins.textContent) - 1 >= 0) {
                    mins.textContent = Number(mins.textContent) - 1;
                }
                break;
            case 'addSecs':
                if (Number(secs.textContent) + 1 < 60) {
                    secs.textContent = Number(secs.textContent) + 1;
                }
                break;
            case 'minSecs':
                if (Number(secs.textContent) - 1 >= 0) {
                    secs.textContent = Number(secs.textContent) - 1;
                }
                break;
            case 'start':
                if (intId === 0 && !sound.playing()) {
                    start();
                }
                break;
            }
        }

        /************* Events *************/
        document.querySelector('.inner').addEventListener('click', setClock, false);
    })();
});