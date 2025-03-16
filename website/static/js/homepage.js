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
function showProyectos(i){
    //console.log(i.vars.onUpdateParameters.proyectos)
    const proyectos=i.vars.onUpdateParameters.proyectos;
    const skipper=i.vars.onUpdateParameters.skipper;
    const parts = 1/(proyectos.length-1);

    let current= Math.round(i.progress/parts);
    const progress= Math.min(((i.progress-0.01)%parts),parts)/parts;
    if(current>1){
        if(!$(skipper).hasClass("show-generic")){
            $(skipper).addClass("show-generic");
        }
    }else{
        if($(skipper).hasClass("show-generic")){
            $(skipper).removeClass("show-generic");
        }
    }
    //if(current>0){
    if(current%2!=0 && current>1){
        current-=1;
    }
        for(let j=0;j<proyectos.length;j++){
            const img=$(proyectos[j]).children("#back");
            const datos=$(proyectos[j]).children("datos");

            if(img.length>0){
                if(j==current){
                    if(!$(img).hasClass("img-zoom")){
                        $(img).addClass("img-zoom");
                    }
                }else{
                    if($(img).hasClass("img-zoom")){
                        $(img).removeClass("img-zoom");
                    }
                }
            }
            if(datos.length>0){
                if(j==current){
                    if(!$(datos).hasClass("show-generic")){
                        $(datos).addClass("show-generic");
                    }
                }else{
                    if($(datos).hasClass("show-generic")){
                        $(datos).removeClass("show-generic");
                    }
                }
            }
        }
    //}
    /*console.log(progress)*/

}
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
    for(let i=0;i<carrouseles.length;i++){
        //carrouseles[i]();
        console.log(carrouseles[i]);
        console.log(carrouseles[i]["section_type"]);
        gsap.from(carrouseles[i]["section_type"],{
            scale: 0.5,
            ease:"power.in",
            scrollTrigger:{
                trigger:("#"+carrouseles[i]["anchor_pre"]),
                start:"100% 40%",
                end:"100% -50%",
                scrub:1,
                markers: false,
            }
        })
        let proyectos = gsap.utils.toArray("#"+carrouseles[i]["anchor_main"]+" proyecto");
        let getLength=()=>{
            return proyectos.length*$(window).height()*1;
        }
        let scrollProyectos = gsap.to(proyectos, {
            xPercent: (i) => {
                return -100 * i
            },
            duration: (i) => 0.5 * i,
            ease: "none", // <-- IMPORTANT!
            scrollTrigger: {
                trigger:"#"+carrouseles[i]["anchor_main"],
                start:"top 0%",

                scrub:1,
                pin: true,
                pinSpacing: true,
                toggleClass: {targets:$(carrouseles[i]["section_type"]),className:"full-screen"},
                onUpdate: showProyectos,
                onUpdateParameters:{"proyectos":proyectos,"skipper":$("#"+carrouseles[i]["skip_id"])},
                markers: false,
                //snap: directionalSnap(1 / (proyectos.length - 1)),
                /*snap: {
                    snapTo: 1 / (proyectos.length -1),
                    duration: 0.01,
                    delay:0.2,
                    ease: "power1.inOut"
                },*/
            //end: "+=$ bottom"
                end: () => `+=${getLength()} bottom`,
                invalidateOnRefresh:true
            }
        });
        if(carrouseles[i]["customTrackers"]!=""){
            customTrackers[carrouseles[i]["customTrackers"]]=scrollProyectos;
        }
        $("#"+carrouseles[i]["skip_id"]).on("click",function(){
            gsap.to(window, { duration: 1, scrollTo: {y:"#"+carrouseles[i]["skip_to"],offsetY: $(window).height()/2 }});
        })
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