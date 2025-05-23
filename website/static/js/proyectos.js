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
    //init();
    resizeController.start(onResize);
    /*for(let i=0;i<globalOnInitRun.length;i++){
        globalOnInitRun[i]();
    }*/
    textFitDo()
    checkOnLoad();
});

core.buildContent=function (data){
    core.currentId++;
    let ficha = ""
    if(data.data.anio!="" && data.data.anio != null){
        ficha+='<fecha>'+core.labels.fecha+': <b>'+data.data.anio+'</b></fecha>'
    }
    let hayCiudad=false;
    if((data.data.ciudad !="" || data.data.pais!="") && (data.data.ciudad !=null || data.data.pais!=null)){
        ficha+='<ubicacion>'+core.labels.ubicacion+': '
        if(data.data.ciudad !="" && data.data.ciudad!=null){
            hayCiudad=true;
            ficha+='<b>'+data.data.ciudad+'</b>'
        }
        if(data.data.pais!="" && data.data.pais!=null){
            if(hayCiudad){
                ficha+=' | '
            }
            ficha+='<b>'+data.data.pais+'</b>'
        }
        ficha+='</ubicacion>'
    }
    let part=""
    if(data.data.entes!="" && data.data.entes!=null){
        part+="<b>"+data.data.entes+"</b><br>"
    }
    if(data.data.artistas!="" && data.data.artistas!=null){
        part+="<b>"+data.data.artistas+"</b><br>"
    }
    if(data.data.marcas!="" && data.data.marcas!=null){
        part+="<b>"+data.data.marcas+"</b><br>"
    }
    if(part!=""){
        ficha+="<entes>"+core.labels.participaron+": "+part+"</entes>"
    }
    let tags_t="<tags>"

    for(let i=0; i<proy[data.data.slug].tags.length; i++){
        let t= proy[data.data.slug].tags[i];
        tags_t+="<a href='#' onclick='clickOnTag(`"+t+"`);return false;'>"
        if(tags[t]["status"]==2){
            tags_t += "<span class='tagselected'>"+tags[t]["name"]+"</span>"
        }else{
            if(filterList.length>0){
                tags_t += "<span class='tagsecondary'>"+tags[t]["name"]+"</span>"
            }else{
                tags_t += "<span>"+tags[t]["name"]+"</span>"
            }
        }
        tags_t+="</a>"
    }
    tags_t+="</tags>"
    let imagenes=""
    if(data.imagenes.length>0){
        imagenes+="<imagenes-archivo>"
        for(let i=0; i<data.imagenes.length; i++){

            imagenes+='<img src="'+data.imagenes[i]+'" alt="">'
        }
        imagenes+="</imagenes-archivo>"
    }
    $('proyectos-page').append('' +
        '<content id="holder'+core.currentId+'" class="content-closed" style="display: none;">'+
        '<content-navbar><span href="#" onclick="clickOnBack();return false;">'+
        core.labels.back+'</span><span href="#" onclick="clickOnNext();return false;">'
        +core.labels.next+'</span></content-navbar>'+
        '<linea-larga></linea-larga>'+
        '<content-detalle>'+
        '<titulo><span>'+data.data.titulo+'</span></titulo>'+
        '<img src="/media/'+data.data.imagen_principal+'" alt="">'+
        '<h2>'+data.data.slide_text+'</h2>'+
        '<h3>'+data.data.copete+'</h3>'+
        '<data><space></space>'+
        ficha+
        '</data>'+
        tags_t+
        imagenes+
        '<h2>'+data.data.subtitulo+'</h2>'+
        '<texto-largo>'+data.data.texto+'</texto-largo>'+
        '</content-detalle>'+
        '<linea-larga></linea-larga>'+
        '<content-navbar><span href="#" onclick="clickOnBack();return false;">'+
        core.labels.back+'</span><span href="#" onclick="clickOnNext();return false;">'
        +core.labels.next+'</span></content-navbar>'+
        '<space></space>'+
        '<space></space>'+
        '</content>'+
        '');
}



