
import {Tween, Easing} from 'https://unpkg.com/@tweenjs/tween.js@23.1.3/dist/tween.esm.js'
import * as THREE from 'three';
import buildPostpro from './postprocess/PostproSinMixer.js';
import Escena1 from "./Scenes/escena1.js";
import Escena2 from "./Scenes/escena2.js";
import Escena3 from "./Scenes/escena3.js";

const manager={};

manager.clamp = (num, min, max) => Math.min(Math.max(num, min), max)
manager.build= function (){
    manager.lastTime=-1;

    manager.renderer = new THREE.WebGLRenderer({
        antialias: true, stencil: true,
        canvas: document.querySelector("#bg"),
    });
    manager.renderer.setPixelRatio(window.devicePixelRatio);
    manager.renderer.setSize(window.innerWidth,window.outerHeight);

    this.escena1=new Escena1();
    this.escena2=new Escena2();
    this.escena3=new Escena3();
    this.escena1.Build();
    this.escena2.Build();
    this.escena3.Build();

    manager.composer1 = buildPostpro(this.escena2.scene,this.escena2.camera,manager.renderer);


    /*this.escena1.Enable();
    this.escena2.Enable();
    this.escena3.Enable();*/

    requestAnimationFrame((now)=>manager.Update(now));
}
manager.Update=function(now){

    if (manager.lastTime==-1) { manager.lastTime = now; }
    let elapsed = now - manager.lastTime;
    manager.lastTime = now;
    let show =true;
    //console.log(customTrackers["tracker3"].progress())
    if(customTrackers["tracker3"].progress()>0.05 && customTrackers["tracker3"].progress()<0.95){
        show=false;
    }
    if(customTrackers["tracker4"].progress()>0.05 && customTrackers["tracker4"].progress()<0.95){
        show=false;
    }
    /*if(pinverts_trackers_main["tracker5"].progress()>0.05 && pinverts_trackers_main["tracker5"].progress()<0.2){
        show=false;
    }*/
    if(customTrackers["tracker11"].progress()>0.05 && customTrackers["tracker11"].progress()<0.95){
        show=false;
    }
    if(pinverts_trackers[0].progress>0.05 && pinverts_trackers[2].progress<0.5){
        show=false;
    }
    //console.log(manager.custom.algoritmos[0].progress)
    if(customTrackers["tracker3"].progress()<0.5){
        this.escena1.Enable();
        this.escena2.Disable();
        this.escena3.Disable();
        if(show){
            this.escena1.Process(manager,customTrackers);
        }
        manager.composer1._r.camera=manager.escena1.camera;
        manager.composer1._r.scene=manager.escena1.scene;
    //}else if(customTrackers["tracker5"].progress()<0.2){
    }else if(pinverts_trackers[1].progress<0.2){
        this.escena2.Enable();
        this.escena1.Disable();
        this.escena3.Disable();
        if(show){
            this.escena2.Process(manager,customTrackers);
        }
        manager.composer1._r.camera=manager.escena2.camera;
        manager.composer1._r.scene=manager.escena2.scene;
    }else {

        this.escena3.Enable();
        this.escena1.Disable();
        this.escena2.Disable();
        if(show){
            this.escena3.Process(manager,customTrackers);
        }
        manager.composer1._r.camera=manager.escena3.camera;
        manager.composer1._r.scene=manager.escena3.scene;
    }

    //console.log(manager.custom.test.progress());
    //this.escena3.Process(manager,manager.custom, elapsed);
    /*manager.composer1._r.camera=manager.escena3.camera;
    manager.composer1._r.scene=manager.escena3.scene;*/
    if(show){
        manager.composer1.render();
    }

    requestAnimationFrame((now)=>manager.Update(now));

}

manager.getTweenedValueQuadInOut=function(startVal, endVal, currentTime, endTime=1, startTime=0) {
        var delta = endVal - startVal;
        var percentComplete = manager.clamp((currentTime-startTime)/(endTime-startTime),0,1);
        let tweener = Easing.Quadratic.InOut;
        return tweener(percentComplete) * delta + startVal
    }
manager.getTweenedValueQuadIn=function(startVal, endVal, currentTime, endTime=1, startTime=0) {
        var delta = endVal - startVal;
        var percentComplete = manager.clamp((currentTime-startTime)/(endTime-startTime),0,1);
        let tweener = Easing.Quadratic.In;
        return tweener(percentComplete) * delta + startVal
    }
manager.onResize=function(){
    manager.renderer.setPixelRatio(window.devicePixelRatio);
    manager.renderer.setSize(window.innerWidth,window.outerHeight);
	manager.escena1.OnResize();
	manager.escena2.OnResize();
	manager.escena3.OnResize();
}

globalInitializers.push(()=>{
    manager.build()
    globalOnResizers.push(manager.onResize);
})