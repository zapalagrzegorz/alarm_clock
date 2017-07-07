

//  całość znów bardziej przypomina jeden obiekt z metodami

function tick () {
    let secs;
    let mins;
    let intId;
    //  = start();
    //  = setInterval(() => {
    //     secs = Number(document.querySelector('#sec').textContent);
    //     secs -= 1;
    //     if (secs == -1) {
    //         document.querySelector('#sec').textContent = secs = 59;
    //         mins = Number(document.querySelector('#mins').textContent);
    //         mins -= 1;
    //         document.querySelector('#mins').textContent = mins;
    //         if (mins == 0) {
    //             // clear interval i
    //             // wywołaj dźwięk i animację
    //             return;
    //         }
    //     }
    //     document.querySelector('#sec').textContent = secs;
    // }, 1000);
    function clrInt () {
        clearInterval(intId);
    }
    function reset () {
        clrInt();
        document.querySelector('#sec').textContent = 0;
        document.querySelector('#sec').textContent = 0;
    }
    function start () {
        intId = setInterval(function timer () {
            secs = Number(document.querySelector('#sec').textContent);
            console.log(secs);
            secs -= 1;
            if (secs == -1) {
                document.querySelector('#sec').textContent = secs = 59;
                mins = Number(document.querySelector('#mins').textContent);
                mins -= 1;
                document.querySelector('#mins').textContent = mins;
                if (mins == 0) {
                    // clear interval i
                    // wywołaj dźwięk i animację
                    return;
                    // console.log('mins = 0');
                }
            }
            document.querySelector('#sec').textContent = secs;
        }, 1000);
    }

    document.querySelector('#stop').addEventListener('click', clrInt);
    document.querySelector('#reset').addEventListener('click', reset);
    document.querySelector('#start').addEventListener('click', start);

        // czy po resecie musze removeEventListener wywoływać
        // guzik reset by miał wywoływał clrInt oraz usuwał listener 
        // listen'y bym usuwał wcześniej, przed przypisaniem.
        // return secs;
}
tick();


// QUnit.test('calculation test', function (assert) {

//     // priorytet działań
//     setTimeout(assert.deepEqual(tick(), 59), 1500);
// });