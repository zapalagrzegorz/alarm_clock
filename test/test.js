


function tick () {
    let secs;
    let mins;
    setInterval(()=> {
        secs = Number(document.querySelector('#sec').textContent);
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
            }
        }
        document.querySelector('#sec').textContent = secs;
    }, 1000);

    return secs;
}




QUnit.test('calculation test', function (assert) {

    // priorytet działań
    setTimeout(assert.deepEqual(tick(), 59), 1500); 
});