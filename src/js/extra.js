var header;

document.addEventListener("DOMContentLoaded", function () {
    header = document.querySelector('.transition__wipe');

    TweenMax.set(header, {
        scaleY: 0,
        transformOrigin:"0% 100%"
    });

    barba.init({
        transitions: [
            {
                // sync:false, // default
                // You can run only 1 transitions at the same time.
                // All your different steps/hooks should be declared inside the same transition.
                // Previously, only the last declared was called…
                beforeLeave({current}) {
                    // This allows to use the hook in an asynchronous way
                    const done = this.async();

                    var tl = new TimelineMax({
                        paused:true,
                        onComplete: done, // "resolve the hook"
                    });


                    tl.to(header, 0.5, {scaleY:1});
                    tl.to(header, 0.5, {scaleY:0, transformOrigin:"100% 0%"});
                    tl.set(header, {transformOrigin:"0% 100%"});
                    tl.play();
                },

                // This do not return anything and use the "this.async" pattern.
                // In this case, context matters, we do not use arrow function…
                leave({ current }) {
                    containerOutAnim(current.container, this.async());
                },

                // This returns a promise, we do not care about "context/arrow function"
                enter: ({ next }) => containerInAnim(next.container),
            },
        ], // transitions
    }); //barba init
}); // wrapper

// We pass the "async" callback.
function containerOutAnim (element, done) {
    TweenMax.to(element, 1, { y:"200", autoAlpha:0, onComplete: done });
}

// We return a promise.
function containerInAnim (element) {
    return new Promise(resolve => {
        TweenMax.from(element, 2, {autoAlpha:0, onComplete: resolve });
    });
}



