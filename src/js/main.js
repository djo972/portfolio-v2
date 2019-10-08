
// import { cube } from '/component/test.js';
import { exportChat } from './component/chat.js';


var App = function(){
    var intervalId = null;
    var canvas, stage, exportRoot;
    // const x = document.getElementById("clickIt");
    const inte = document.getElementById("inte");
    function giveMeTheLight(){                           
        setTimeout(function() {
            setTimeout(function(){
                $('.glow').addClass('appaer');
            },4000);
            TweenMax.to(
                ".shutter",
                5,
                {
                    y:-850,ease: Power0.easeNone
                }
            );
            TweenMax.to(
                ".content-glow",
                0.3,
                {autoAlpha:1}
                );
            TweenMax.to(
                "#home,.content-glow",
                4,
                {
                    webkitFilter: "brightness(1)",
                    filter: "brightness(1)",
                    ease: Power0.easeNone,
                    onComplete:function(){
                        App.initWindow();
                    },
                    force3D: false
                }
            );
        }, 4000);
    }
    function enterChat(){}

    function newCursor(){
        $(document)
            .mousemove(function(e) {
                $('.your-cursor4')
                    .eq(0)
                    .css({
                        left: e.pageX,
                        top: e.pageY
                    });
                setTimeout(function() {
                    $('.your-cursor4')
                        .eq(1)
                        .css({
                            left: e.pageX,
                            top: e.pageY
                        });
                }, 400);
                setTimeout(function() {
                    $('.your-cursor4')
                        .eq(2)
                        .css({
                            left: e.pageX,
                            top: e.pageY
                        });
                }, 200);
            });
        $(document).on("mousemove", function(e) {
            var  mouseX = e.pageX;
            var  mouseY = e.pageY;
        });
    }
    function handleEvent(){
        // console.log('ini');
    // inte.addEventListener("click", function(){
    //     App.initVibre(0,5000);
    //     App.initLaunch();
    // }, true);

        // inte.onclick = function() {
        //
        //     window.removeEventListener("test", options, options);
        // };

        $(".inte").click(function() {
            let elm = document.getElementById('smoke');
            elm.className = 'start';
            console.log('anyyy');
            App.initVibre(0,7000);
            App.initLaunch();
        });


        $("#dp").click(function() {
            $(".tit").toggleClass("show", 4000);
        });



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
    }
    function vibre(e,a) {
    // *Vibre SCRIPT*
        let element = document.getElementsByClassName('det');
        let elementOne = element[e];

        if( elementOne == undefined){
            let a = 0;

        }
        // console.log(a);
        // console.log(element.length);
        // console.log(elementOne);


        if (element.length > 1)
        elementOne.classList.add("vibre");
        setTimeout(function(){
            if ((element.length > 1 )&& ( elementOne != undefined))
            elementOne.classList.remove("vibre");
            else{
                return;
            }
        }, a);
    }
    function start(){
        setInterval(function(){vibre(1, 7000); }, 15000);
    }
    function $_(id_){
        return document.getElementById(id_);
    }
    function tic_reNov() {
    // *MODEM SCRIPT*
        let elementM = document.getElementsByClassName('modem');
        // let elementModem = elementM[0];
        // console.log(elementM.length);
        if(elementM.length >0){
            var i=$_("mn_"+Math.round(Math.random()*3));
            if(Math.round(Math.random()*2))
                i.classList.toggle("i_t");
            if(!Math.round(Math.random()*7))
                $_("mn_7").classList.toggle("i_t");
            window.setTimeout(tic_reNov,(Math.random()*400+20));
        }

    }
    function Clock(){
     // *CLOCK SCRIPT*

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
    function animWindow(){
        let sub = document.querySelector(".subway");
        let jeep =  document.querySelector(".jeep");
        let family =  document.querySelector(".family");
        let poste =  document.querySelector(".poste");
        let twingo =  document.querySelector(".twingo");
        let supercar =  document.querySelector(".supercar");
        let suv =  document.querySelector(".suv");
        let cam =  document.querySelector(".cam");
        let bache =  document.querySelector(".bache");
        let sedan =  document.querySelector(".sedan");
        let tee =  document.querySelector(".tee");
        let dodge =  document.querySelector(".dodge");
        let jeepTwo =  document.querySelector(".jeepTwo");
        let cloud = document.querySelector(".cloud");
        let cloud2 =  document.querySelector(".cloudTwo");
        var tl2 = new TimelineMax({
            repeat:-1,
        });
        var tl3 =new TimelineMax({
            repeat:-1,
        });
        tl3.to(cloud, 40, {x:400,force3D:false })
            .to(cloud2, 60, {x:800 ,force3D:false},0);

        tl2.to(sub, 2, {x:-800 })
            .add("scene1", 0)
            .to(jeep,2,{x:850,ease: Power0.easeNone,force3D:false}, "scene1")
            .to(poste,2,{x:390,y:-18,ease: Power0.easeNone,force3D:false}, 1)
            .to(family,2.5,{x:850,ease: Power0.easeNone,force3D:false}, "scene1")
            .to(sub,2,{x:-1350,ease: Power0.easeNone,force3D:false}, 4)
            .to(poste,1,{x:530,ease: Power0.easeNone,force3D:false}, 4)
            .to(poste,1,{x:650,y:12,ease: Power0.easeNone,force3D:false}, 7.5)
            .to(poste,1,{x:955,ease: Power0.easeNone,force3D:false}, 8.5)
            .to(twingo,3,{x:450,ease: Power0.easeNone,force3D:false},"-=6")
            .to(supercar,4,{x:850,ease: Power1.easeIn,force3D:false},"-=5")
            .to(twingo,0.4,{x:485,y:25,ease: Power0.easeNone,force3D:false},"-=3")
            .to(twingo,2,{x:850,ease: Power0.easeNone,force3D:false},"-=2.6")
            .to(suv,2,{x:850,ease: Power0.easeNone,force3D:false},8)
            .to(cam,3,{x:850,ease: Power0.easeNone,force3D:false},7)
            .to(".fireS", 2, {css:{backgroundSize:"100%", background:"url(../images/windows/fireOrange.png) no-repeat center"}, ease:Power2.easeOut,force3D:false},9)
            .to(bache,2.5,{x:350,ease: Power4.easeOut,force3D:false},9)
            .to(sedan,3,{x:350,ease: Power4.easeOut,force3D:false},9.5)
            .to(".fireS", 2, {css:{backgroundSize:"100%", background:"url(../images/windows/fireRed.png) no-repeat center"}, ease:Power2.easeOut,force3D:false},11)
            .to(tee,3,{x:200,ease: Power4.easeOut,force3D:false},10)
            .to(".fireS", 2, {css:{backgroundSize:"100%", background:"url(../images/windows/fireGreen.png) no-repeat center"}, ease:Power2.easeOut,force3D:false},13)
            .to(bache,3.5,{x:850,ease: Power1.easeIn,force3D:false,},13.5)
            .to(sedan,3,{x:850,ease: Power1.easeIn,force3D:false},13.5)
            .to(tee,4,{x:850,ease: Power1.easeIn,force3D:false},14)
            .to(dodge,3,{x:850,y:15,ease: Power2.easeIn,force3D:false},15)
            .to(jeepTwo,3,{x:850,ease: Power0.easeOut,force3D:false},16);

}
    function rocketLaunch(){
        var tl = new TimelineMax();
        tl.to( $('.burst') , 2, { x:5 , y:-70});
        tl.to( $('.me-gth') , 2, { x:5 , y:-70 ,ease: Power4.easeIn});
        tl.to($('.fire'),0.2,{autoAlpha:1,scale:1.1},'0');
        tl.to($('.bfire'),0.1,{autoAlpha:1,scale:1.1},"2" );
        tl.to($('.glow'),2.5,{transformOrigin:"top right",rotation:-90,ease: Elastic.easeOut.config(1, 0.3)},"2" );
        tl.to($('.content-trash'),2,{transformOrigin:"bottom right",rotation:84,ease: Power4.easeIn,},"2" );
        tl.to($('.ball'),6.2,{rotation:720,y:-300,x:46 ,ease: Power4.easeInOut,},"3" );
        tl.to($('.work'),2,{rotation:50},"2" );
        tl.to($('.clocki'),1,{rotationX:-720, y:600,autoAlpha:1,force3D:true,ease:Power1.easeOut},"2" );
        // tl.to($('.clocki'),0.5,{y:700 ,rotation:90},"2" );
        tl.to( $('.burst') , 2.5, { y:-1000, ease: Power4.easeIn }, "5" );
        tl.to( $('.me-gth') , 2, { x:5 , y:80 ,ease: Power4.easeIn},"7");
        tl.to( $('#smoke') , 2, { autoAlpha:0 ,ease: Power4.easeIn},"15");

        // .to( $('.fetch') ,2, {rotationX:-360, transformOrigin:"left top"}, "2" );s
    }
    function typed(){
        var typed6 = new Typed('#typed', {
            strings: ['npm install MyWorld^1000\n ` <br> installing components...` ^3000\n `hello...`i\'m djo <br> welcome in my world. <br> Stay inspired, stay curious <3 . '],
            // cursorChar: '_',
            typeSpeed: 50,
            startDelay:2000
        });
    }
    function  hoverProject(){
        $(' #da-thumbs > li ').each(function() {
            $(this).hoverdir();
        });
    }

    return {
        initCursor:function(){
            newCursor();
        },
        initHandle:function(){
            handleEvent();
        },
        initTyped:function(){
            typed();
        },
        initVibre:function(e,a){
            vibre(e,a);
        },
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
        initLaunch:function(){
            rocketLaunch();
        },
        initHover:function(){
            hoverProject();
        },
        initLight:function(){
            giveMeTheLight();
        }
    };
}();






var pathname = window.location.pathname;
switch(pathname) {
    case "/" :
        // console.log("home");
        App.initStart();
        App.initTictoc();
        App.initTyped();
        App.initClock();
        App.initHandle();
        App.initCursor();
        // App.initLaunch();
        break;
    case "/game" :
        console.log("game");
        break;
    case "/contact":
        exportChat();
        moove();
        emoticonShow();
        break;
}

window.addEventListener('load', function () {
});


/**
 * Loader de page
//  */
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
    $(window).load(function() {
        // La page est integralement chargee
        // // chargementTermine();
        App.initLight();
        // var scene = document.getElementById('vivacity');
        // var parallaxInstance = new Parallax(scene, {
        // });
    });


//********************* pattern for click event
const x = document.getElementById("clickIt");
const y = document.getElementById("hoverPara");

// x.addEventListener("click", RespondClick);
// y.addEventListener("mouseover", RespondMouseOver);
// y.addEventListener("mouseout", RespondMouseOut);

// function RespondMouseOver() {
//     document.getElementById("effect").innerHTML +=
//         "MouseOver Event" + "<br>";
// }
//
// function RespondMouseOut() {
//     document.getElementById("effect").innerHTML +=
//         "MouseOut Event" + "<br>";
// }
//
// function RespondClick() {
//     document.getElementById("effect").innerHTML +=
//         "Click Event" + "<br>";
// }
//
// Array.prototype.forEach.call(
//     document.querySelectorAll('[id^=dealsButton_]'), function(e) {
//         e.addEventListener('click', one);
//     });
// **************************************************************************

// *****************Transition PAGE********************


    // ********************************ROCKET ANIMATION*****************************************

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
            debug:true,
            cacheIgnore: true,
            transitions: [{
                    // sync:false, // default
                    // You can run only 1 transitions at the same time.
                    // All your different steps/hooks should be declared inside the same transition.
                    // Previously, only the last declared was called…
                from: 'home',
                // apply only when transitioning to `[data-barba-namespace="products | contact"]`
                to: {
                    namespace: [
                        'insta',
                        'contact'
                    ]
                },

                    beforeLeave({current, next, trigger}) {
                        // This allows to use the hook in an asynchronous way
                        const done = this.async();
                        console.log(`current : ${current}-- next: ${next}-- trigger: ${trigger}`);
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
                    leave({ current, next, trigger}) {
                        containerOutAnim(current.container, this.async());
                        console.log(current.container);
                    },

                    // This returns a promise, we do not care about "context/arrow function"
                    enter({current, next, trigger}) {
                        containerInAnim(next.container);
                        exportChat();
                        // twttr.widgets.load(
                        //     document.getElementById("timeline")
                        // );
                    },


                    // ****************hook*************

                    // beforeAppear() {},
                    // appear() {},
                    // afterAppear() {},
                    // beforeLeave() {},
                    // leave() {},
                    // afterLeave() {},
                    // beforeEnter() {},
                    // enter() {},
                    // afterEnter() {}
                },{
                // name: 'svg-slide',
                // sync:false, // default
                // You can run only 1 transitions at the same time.
                // All your different steps/hooks should be declared inside the same transition.
                // Previously, only the last declared was called…
                from: {
                    namespace: [
                        'insta',
                        'contact'
                    ]
                },
                // apply only when transitioning to `[data-barba-namespace="products | contact"]`
                to: 'home',

                beforeLeave({current, next, trigger}) {
                    // This allows to use the hook in an asynchronous way
                    const done = this.async();
                    console.log(`current : ${current}-- next: ${next}-- trigger: ${trigger}`);
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
                leave({ current, next, trigger}) {
                    containerOutAnim(current.container, this.async());
                    console.log(current.container);
                },

                // This returns a promise, we do not care about "context/arrow function"
                enter({current, next, trigger}) {
                    containerInAnim(next.container);
                    App.initWindow();
                    App.initTyped();
                    App.initTictoc();
                    App.initClock();
                    App.initHandle();
                    App.initStart();
                },
            }

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


// basic default transition (with no rules and minimal hooks)
// barba.init({
//     transitions: [{
//         leave({ current, next, trigger }) {
//             // do something with `current.container` for your leave transition
//             // then return a promise or use `this.async()`
//         },
//         enter({ current, next, trigger }) {
//             // do something with `next.container` for your enter transition
//             // then return a promise or use `this.async()`
//         }
//     }]
// });

// dummy example to illustrate rules and hooks
// barba.init({
//     transitions: [{
//         name: 'dummy-transition',
//
//         // apply only when leaving `[data-barba-namespace="home"]`
//         from: 'home',
//
//         // apply only when transitioning to `[data-barba-namespace="products | contact"]`
//         to: {
//             namespace: [
//                 'products',
//                 'contact'
//             ]
//         },
//
//         // apply only if clicked link contains `.cta`
//         custom: ({ current, next, trigger })=> trigger.classList && trigger.classList.contains('cta'),
//
//
//         // do leave and enter concurrently
//         sync: true,
//
//         // available hooks…
//         beforeAppear() {},
//         appear() {},
//         afterAppear() {},
//         beforeLeave() {},
//         leave() {},
//         afterLeave() {},
//         beforeEnter() {},
//         enter() {},
//         afterEnter() {}
//     }]
// });




function emoticonShow(){
    window.emojiPicker = new EmojiPicker({
        assetsPath: 'images/',
        popupButtonClasses: 'fa fa-smile-beam' });
    window.emojiPicker.discover();
}


function mooveIcon(e,a) {

        console.log('icon');

    let element = document.getElementsByClassName('message-title');
    console.log(element);

    if( element == undefined){
        let a = 0;
    }

    if (element.length > 1)
        console.log('0');
        console.log(element[0]);
        element[0].classList.add("active");

    setTimeout(function(){
        if ( element[0].classList.contains('active')){
            console.log("de");
            element[0].classList.remove("active");
        }
        else{
            console.log("der");
            return;
        }
    }, a);
}
function moove(){
        console.log('moove');
    setInterval(function(){mooveIcon(1, 1000); }, 5000);
}


$('body').on("click",function(){
    $(".folding").toggleClass('folded');
});
$(function(){
    $('#select_link').click(function(e){
        e.preventDefault();
        console.log('select_link clicked');

        var data = {};
        data.msg = "message";
        data.mail = "djo972@gmail.com";

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'http://localhost:5000/cntact',
            success: function(info) {
                console.log('success');
                console.log(info);
            },
            error:function (error) {
                console.log(error);
            }
        });
    });
});

$('.btn_nav,.social-buttons__button').click(function() {
if (!$(this).hasClass("actived")){
    $('.social-buttons__button').removeClass('actived');
    $(this).addClass('actived');
    $('.page__style').addClass('animate_content');
    $('.page__description').fadeOut(100).delay(2800).fadeIn();


    setTimeout(function() {
        $('.page__style').removeClass('animate_content');
    }, 3200);

    //remove fadeIn class after 1500ms
    setTimeout(function() {
        $('.page__style').removeClass('fadeIn');
    }, 1500);
}


});

// on click show page after 1500ms
$('.home_link').not('.actived').click(function() {

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
    }, 1500);
});

$('.about_link').click(function() {
    setTimeout(function() {
        $('.about').addClass('fadeIn');
    }, 1500);

    let loadin = $('.loadin');
    let form = $('form#contact-form');
    let tl4 = new TimelineMax({
        delay:10
    });
    tl4.to(loadin,1,{scale:0})
        .to(loadin,1,{display:'none'})
        .to(form,0.5,{opacity:1},2);

});

$('.contact_link').click(function() {
    setTimeout(function() {
        $('.contact').addClass('fadeIn');
    }, 1500);
});


