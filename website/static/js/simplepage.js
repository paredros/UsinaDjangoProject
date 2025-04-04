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

    resizeController.start(onResize);

    textFitDo()

});
