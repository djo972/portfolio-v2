var App = function(){
    var intervalId = null;
    var canvas, stage, exportRoot;


    // ********************************LOOP GSM  SCRIPT*****************************************
    function vibre(e,a) {
        console.log("init");
        let element = document.getElementsByClassName('det');
        let elementOne = element[e];
        elementOne.classList.add("vibre");
        setTimeout(function(){
            elementOne.classList.remove("vibre");
        }, a);
    }
    function start(){
        setInterval(function(){vibre(1, 7000); }, 15000);
    }
    // ********************************MODEM SCRIPT*****************************************
    function $_(id_){
        return document.getElementById(id_);
    }
    function tic_reNov() {
            var i=$_("mn_"+Math.round(Math.random()*3));
            if(Math.round(Math.random()*2))
                i.classList.toggle("i_t");
            if(!Math.round(Math.random()*7))
                $_("mn_7").classList.toggle("i_t");
            window.setTimeout(tic_reNov,(Math.random()*400+20));
    }

    // ********************************CLOCK SCRIPT*****************************************
 function Clock(){
     setInterval(function() {
         var dt = new Date();
         //$('.time').text(dt);
         var sec_deg = dt.getSeconds() * (360 / 60);
         var min_deg = dt.getMinutes() * (360 / 60);
         var hr_deg = dt.getHours() * (360 / 12) + dt.getMinutes() * (360 / 60 / 12);

         $('.clock .second-hand').css({
             '-webkit-transform': 'rotate(' + sec_deg + 'deg)',
             '-moz-transform': 'rotate(' + sec_deg + 'deg)',
             '-o-transform': 'rotate(' + sec_deg + 'deg)',
             '-ms-transform': 'rotate(' + sec_deg + 'deg)',
             'transform': 'rotate(' + sec_deg + 'deg)'
         });

         $('.clock .minute-hand').css({
             '-webkit-transform': 'rotate(' + min_deg + 'deg)',
             '-moz-transform': 'rotate(' + min_deg + 'deg)',
             '-o-transform': 'rotate(' + min_deg + 'deg)',
             '-ms-transform': 'rotate(' + min_deg + 'deg)',
             'transform': 'rotate(' + min_deg + 'deg)'
         });

         $('.clock .hour-hand').css({
             '-webkit-transform': 'rotate(' + hr_deg + 'deg)',
             '-moz-transform': 'rotate(' + hr_deg + 'deg)',
             '-o-transform': 'rotate(' + hr_deg + 'deg)',
             '-ms-transform': 'rotate(' + hr_deg + 'deg)',
             'transform': 'rotate(' + hr_deg + 'deg)'
         });

     }, 1000);
 }

    // *******************************anim windows SCRIPT*****************************************
function animWindow(){
    function init() {
        canvas = document.getElementById("canvas");
        images = images || {};
        var loader = new createjs.LoadQueue(false);
        loader.addEventListener("fileload", handleFileLoad);
        loader.addEventListener("complete", handleComplete);
        loader.loadManifest(lib.properties.manifest);
    }

    function handleFileLoad(evt) {
        if (evt.item.type == "image") {
            images[evt.item.id] = evt.result;
        }
    }

    function handleComplete() {
        exportRoot = new lib.Sansnom2();
        stage = new createjs.Stage(canvas);
        stage.addChild(exportRoot);
        stage.update();
        createjs.Ticker.setFPS(lib.properties.fps);
        createjs.Ticker.addEventListener("tick", stage);
    }
}

    // *******************************SKILL SCRIPT*****************************************
function paintLazy(){
        var pathObj = {
            "lool": {
                "strokepath": [{
                    "path": "M100.015,23.056C48.091,23.056,6,65.378,6,117.585s42.091,94.529,94.015,94.529s94.015-42.322,94.015-94.529  S151.937,23.056,100.015,23.056z M100.099,208.842c-50.125,0-90.761-40.858-90.761-91.257s40.634-91.257,90.761-91.257  s90.761,40.858,90.761,91.257S150.225,208.842,100.099,208.842z",
                    "duration": 600
                }],
                "dimensions": {
                    "width": 200,
                    "height": 216
                }
            },


            "lal": {
                "strokepath": [{
                    "path": "M100.015,23.056C48.091,23.056,6,65.378,6,117.585s42.091,94.529,94.015,94.529s94.015-42.322,94.015-94.529  S151.937,23.056,100.015,23.056z M100.099,208.842c-50.125,0-90.761-40.858-90.761-91.257s40.634-91.257,90.761-91.257  s90.761,40.858,90.761,91.257S150.225,208.842,100.099,208.842z",
                    "duration": 800
                }],
                "dimensions": {
                    "width": 200,
                    "height": 216
                }
            },
            "lil": {
                "strokepath": [{
                    "path": "M100.015,23.056C48.091,23.056,6,65.378,6,117.585s42.091,94.529,94.015,94.529s94.015-42.322,94.015-94.529  S151.937,23.056,100.015,23.056z M100.099,208.842c-50.125,0-90.761-40.858-90.761-91.257s40.634-91.257,90.761-91.257  s90.761,40.858,90.761,91.257S150.225,208.842,100.099,208.842z",
                    "duration": 1000
                }],
                "dimensions": {
                    "width": 200,
                    "height": 216
                }
            },

            "lel": {
                "strokepath": [{
                    "path": "M100.015,23.056C48.091,23.056,6,65.378,6,117.585s42.091,94.529,94.015,94.529s94.015-42.322,94.015-94.529  S151.937,23.056,100.015,23.056z M100.099,208.842c-50.125,0-90.761-40.858-90.761-91.257s40.634-91.257,90.761-91.257  s90.761,40.858,90.761,91.257S150.225,208.842,100.099,208.842z",
                    "duration": 1200
                }],
                "dimensions": {
                    "width": 200,
                    "height": 216
                }
            }
        };
        $('.chart1').easyPieChart({
            animate: {
                duration: 2000,
                enabled: true
            },
            easing: 'easeOutElastic',
            barColor: '#2C3E50',
            scaleColor: false,
            lineWidth: 5,
            size: 200,
            lineCap: 'circle'
        });
        $('#lool').lazylinepainter({
            "svgData": pathObj,
            "strokeWidth": 2,
            "strokeColor": "#8e44ad"
        }).lazylinepainter('paint');
        $('#lal').lazylinepainter({
            "svgData": pathObj,
            "strokeWidth": 2,
            "strokeColor": "#c0392b"
        }).lazylinepainter('paint');
        $('#lil').lazylinepainter({
            "svgData": pathObj,
            "strokeWidth": 2,
            "strokeColor": "#2980b9"
        }).lazylinepainter('paint');
        $('#lel').lazylinepainter({
            "svgData": pathObj,
            "strokeWidth": 2,
            "strokeColor": "#27ae60"
        }).lazylinepainter('paint');
    }

function rocketLaunch(){
        var tl = new TimelineMax();
        tl.to( $('.burst') , 2, { x:5 , y:-70});
        tl.to($('.fire'),0.2,{autoAlpha:1,scale:1.1},'0');
        tl.to($('.bfire'),0.1,{autoAlpha:1,scale:1.1},"2" );
        tl.to($('.work'),2,{rotation:50},"2" );
        tl.to($('.clocki'),0.5,{y:700 ,rotation:90},"2" );
        tl.to( $('.burst') , 2.5, { y:-1000, ease: Power4.easeIn }, "2" );
        // .to( $('.fetch') ,2, {rotationX:-360, transformOrigin:"left top"}, "2" );
    }



    return {
        initStart: function () {
          start();
        },
        initTictoc:function(){
           tic_reNov();
        },
        initClock:function(){
            Clock();
        },
        initWindow:function(){
            animWindow();
        },
        initSkills:function(){
            paintLazy();
        },
        initLaunch:function(){
            rocketLaunch();
        }
    };
}();

window.addEventListener('load', function () {
    App.initStart();
    App.initTictoc();
    App.initClock();
    App.initWindow();
    App.initSkills();

});







(function($) {
    /**
     * Loader de page
     */
    // $.pageLoader = function() {
    //     // Selection des images en src="
    //     var $elements = $('body').find('img[src]');
    //     // Selection des images en background-image
    //     $('body [style]').each(function() {
    //         var src = $(this).css('background-image').replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
    //         if(src && src != 'none') {
    //             $elements = $elements.add($('<img src="' + src + '"/>'));
    //         }
    //     });
    //
    //
    //
    //     var $chargement = $('#chargement');
    //     var $chargementInfos = $('#chargement-infos');
    //     var elementsCharges = 0;
    //     var dureeMs = 1000;
    //
    //     function animateStep(now, fx) {
    //         $chargementInfos.text(parseInt(now)+'%');
    //     }
    //
    //     function chargementEnCours() {
    //         var pourcentage = 0;
    //         if($elements.length) {
    //             pourcentage = parseInt((elementsCharges / $elements.length) * 100);
    //         }
    //
    //         // Affichage du pourcentage
    //         $chargementInfos
    //             .stop() // stop les anciennes animations
    //             .animate({width:pourcentage + '%'}, dureeMs);
    //         $chargement
    //             .stop() // stop les anciennes animations
    //             .animate({pourcentage:pourcentage}, {
    //                 duration: dureeMs,
    //                 step: animateStep
    //             });
    //     }
    //
    //     function chargementTermine() {
    //         var pourcentage = 100;
    //
    //         // Affichage du pourcentage
    //         $chargementInfos
    //             .stop() // stop les anciennes animations
    //             .animate({width:pourcentage + '%'}, (dureeMs / 2));
    //         $chargement
    //             .stop() // stop les anciennes animations
    //             .animate({pourcentage:pourcentage}, {
    //                 duration: (dureeMs / 2),
    //                 step: animateStep
    //             })
    //             // Disparition du chargement et affichage de la page
    //             .css({opacity: 1})
    //             .animate({opacity: 0}, function() {
    //                 // La page est prete
    //                 $chargement.css({display:'none'});
    //                 $('#container')
    //                     .css({
    //                         opacity: 0,
    //                         visibility:'visible'
    //                     })
    //                     .animate({opacity:1});
    //
    //             });
    //
    //     }
    //
    //     // La page contient des elements permettant d'afficher une barre de progression
    //     if($elements.length) {
    //         chargementEnCours();
    //         $elements.load(function() {
    //             $(this).off('load');
    //             elementsCharges++;
    //             chargementEnCours();
    //         });
    //     }
    //
    //     $(window).load(function() {
    //         // La page est integralement chargee
    //         chargementTermine();
    //         $('#welcome').delay(2000).fadeOut(2000);
    //     });
    //
    // };
})(jQuery);



//********************* pattern for click event
const x = document.getElementById("clickIt");
const y = document.getElementById("hoverPara");

// x.addEventListener("click", RespondClick);
// y.addEventListener("mouseover", RespondMouseOver);
// y.addEventListener("mouseout", RespondMouseOut);

function RespondMouseOver() {
    document.getElementById("effect").innerHTML +=
        "MouseOver Event" + "<br>";
}

function RespondMouseOut() {
    document.getElementById("effect").innerHTML +=
        "MouseOut Event" + "<br>";
}

function RespondClick() {
    document.getElementById("effect").innerHTML +=
        "Click Event" + "<br>";
}



function one() {
    console.log("hai");
}

Array.prototype.forEach.call(
    document.querySelectorAll('[id^=dealsButton_]'), function(e) {
        e.addEventListener('click', one);
    });
// **************************************************************************




$(document).ready(function() {
    $(".mac").mouseover(function() {
        $(".ki").animate({
            top: 680
        }, {
            duration: 1000
        });
    });
    $("#dp").click(function() {
        $(".tit").toggleClass("show", 4000);
    });
    $("#typed").delay(188000).typed({
        strings: ["Futur Développeur web, je suis actuellement à la recherche  d'un contrat de professionnalisation."],
        startDelay:2000
    });
    $(' #da-thumbs > li ').each(function() {
        $(this).hoverdir();
    });
});






$(function() {

});














// *****************Transition PAGE********************

$('.btn_nav').click(function() {
    // animate content
    $('.page__style').addClass('animate_content');
    $('.page__description').fadeOut(100).delay(2800).fadeIn();

    setTimeout(function() {
        $('.page__style').removeClass('animate_content');
    }, 3200);

    //remove fadeIn class after 1500ms
    setTimeout(function() {
        $('.page__style').removeClass('fadeIn');
    }, 1500);

});

// on click show page after 1500ms
$('.home_link').click(function() {
    setTimeout(function() {
        $('.home').addClass('fadeIn');
    }, 1500);
});
$('.projects_link').click(function() {
    setTimeout(function() {
        $('.projects').addClass('fadeIn');
    }, 1500);
});
$('.skills_link').click(function() {
    setTimeout(function() {
        $('.skills').addClass('fadeIn');
        setTimeout(function(){
            paintLazy();
        },1500);
    }, 1500);
});
$('.about_link').click(function() {
    setTimeout(function() {
        $('.about').addClass('fadeIn');
    }, 1500);
});
$('.contact_link').click(function() {
    setTimeout(function() {
        $('.contact').addClass('fadeIn');
    }, 1500);
});










    // ********************************ROCKET ANIMATION*****************************************
$(".inte").click(function() {
    // vibre(0,5000);
     console.log('init');
    App.initLaunch();
});


var tl2 = new TimelineMax();

function test(){
    tl2.to($('.fetch span:first-of-type'),0.5,{rotationX:-360, transformOrigin:"bottom center",ease: Power4.easeOut,repeat:1},"zeta")
        .to($('.fetch span:first-of-type'),1,{y:800,ease: Power4.easeInOut},"zeta");
}

    // ********************************BARBAJS SCRIPT*****************************************
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
                        console.log(current.container);
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


