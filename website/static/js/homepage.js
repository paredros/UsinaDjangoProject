import resizeController from "./utils/Resize.js";
function onResize(){

    //manager.onResize();
    textFitDo();
    for(let i=0;i<globalOnResizers.length;i++){
        globalOnResizers[i]();
    }

}
let checkTextFitDo=false;
function textFitDo(){

    textFit( $("figcaption h1"),{multiLine:true,detectMultiLine:true,
        widthOnly:false,reProcess:true, alignVertWithFlexbox:false,alignVert:false});
    setTimeout(textFitDoCorrection, 1000);
}
function textFitDoCorrection(){
    textFit( $("figcaption h1"),{multiLine:true,detectMultiLine:true,
        widthOnly:false,reProcess:true, alignVertWithFlexbox:false,alignVert:false});
}

window.addEventListener("load", (event) => {
    gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);
    /*manager.build();
    manager.custom={};
    manager.custom.val1=0;
    initMarquee(60, 27);*/
    for(let i=0;i<globalOnPreInitRun.length;i++){
        globalOnPreInitRun[i]();
    }
    init();
    resizeController.start(onResize);
    for(let i=0;i<globalOnInitRun.length;i++){
        globalOnInitRun[i]();
    }
    try{
        requestAnimationFrame(checkReadyToRemovePreload);
    }catch (e){

    }
});
function init() {
    const lenis = new Lenis({
        smoothTouch: true,
        touchMultiplier: 0.1,
    });
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    });
    $("html").removeClass("prevent-scroll-y")

    for(let i=0;i<globalInitializers.length;i++){
        globalInitializers[i]();
    }



    //ESTO VA AL FINAL
    ScrollTrigger.batch("slide-text1 p", {
        start:"-100% 50%",
        end:"bottom -40%",

        onEnter: (batch) =>
            gsap.fromTo(
                batch,{
                    y:-20,
                    scaleY:0,
                    transformOrigin:"top",
                    x:"0vw",
                }, {
                    y:0,
                    scaleY:1,
                    opacity:1,
                    ease:"power2.in",
                x:"0vw",
            }
            ),
            onEnterBack: (batch) =>
                gsap.to(
                    batch, {
                    opacity:1,
                    x:"0vw",
                    ease:"power2.in"
                }
                )
        ,
        onLeaveBack: (batch) =>
            gsap.to(
                batch, {
                opacity:0,
                x:"100vw",
                ease:"power2.out"
            }
            )

        ,
        onLeave: (batch) =>
        gsap.to(batch, {
            opacity:0,
            x:"-100vw",
            ease:"power2.out"
        }),
    });

    ScrollTrigger.batch("slide-text1",{
        trigger:"slide-text1",
        start:"top 0%",
        end:"bottom -30%",
        pin:true,
        pinSpacing:true,
        /*snap: {
            snapTo: 0.5,
            duration: 0.1,
            delay:0.2,
            ease: "power1.inOut"
        },*/
        scrub:1,
        markers:false,
        invalidateOnRefresh:true
    })
    console.log("TERMINO")
}