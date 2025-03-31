import resizeController from "./utils/Resize.js";
function onResize(){

    //manager.onResize();
    textFitDo();
    /*for(let i=0;i<globalOnResizers.length;i++){
        globalOnResizers[i]();
    }*/

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
    for(let i=0;i<globalOnPreInitRun.length;i++){
        globalOnPreInitRun[i]();
    }
    init();
    resizeController.start(onResize);

    textFitDo()

});
function init(){
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
    gsap.fromTo("#bg",
        {
            background: "linear-gradient(77deg, #E8E5E0 30%, #d6f93d 100%)"
        },{
        background: "linear-gradient(27deg, #d6f93d 60%, #3DF9C3 100%)",
        scrollTrigger:{
            trigger: '#test',
            start: 'top top',
            scrub:1,
            end: 'bottom top',
        }
    })

    ScrollTrigger.create({
        trigger: '#nosotros',
        start: 'bottom bottom',
        end: 'bottom -100%',
        pin: true,
        pinSpacing: false,
        markers:false
    });
    ScrollTrigger.create({
        trigger: '#alianzas',
        start: 'bottom bottom',
        end: 'bottom -100%',
        pin: true,
        pinSpacing: false,
        markers:false
    });
    ScrollTrigger.create({
        trigger: '#personas',
        start: 'bottom bottom',
        end: 'bottom -100%',
        pin: true,
        pinSpacing: false,
        markers:false
    });

}