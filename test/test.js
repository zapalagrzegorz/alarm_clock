

//  całość znów bardziej przypomina jeden obiekt z metodami
document.addEventListener('DOMContentLoaded', () => {
    ( () => {
        /*********** variables ********************/
        let secs = document.querySelector('#sec');
        let mins = document.querySelector('#mins');
        let intId = 0;
        // http://soundbible.com/2142-FogHorn-Barge.html
        let sound = new Howl({
            src: ['../dev/audio/foghorn-daniel_simon.webm', 'foghorn-daniel_simon.mp3']
        });


        /************* Methods *************/
        function setClock () {
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
                        // wywołaj dźwięk i animację
                            alarm();
                            return;
                        }
                        secs.textContent = secPointer = 59;
                    }
                    secs.textContent = secPointer;
                }, 1000);
            }

            function alarm () {
                sound.play();
            // animation
            }
            function clrInt () {
                clearInterval(intId);
            }
            // console.log(event.target);
            if (!intId) {
                switch (event.target.classList[0]) {
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
                case 'reset':
                    clrInt();
                    secs.textContent = 0;
                    mins.textContent = 0;
                    break;

                case 'stop':
                    clrInt();
                    break;
                case 'start':
                    start(); 
                    break; 
                }
                
            }
        }
        /************* Events *************/
        document.querySelector('#clock__panel').addEventListener('click', setClock);
    })();
}




// QUnit.test('calculation test', function (assert) {

//     // priorytet działań
//     setTimeout(assert.deepEqual(tick(), 59), 1500);
// });