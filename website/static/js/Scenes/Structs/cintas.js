import ProtoStruct from "./protostruct.js";
import * as THREE from 'three';
import { ImprovedNoise } from 'three/addons/math/ImprovedNoise.js';

function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

class Cintas extends ProtoStruct{
    constructor(scene,camera, colors, params){
        super(scene,camera,colors,params);

        this.colorLight = 0xFFFFFF;

        this.Part4=new THREE.Object3D();
        this.centro4=new THREE.Object3D();

        this.geometryRibbons=[];
        this.ribbonsCant=40;

        const materialRibbon = new THREE.MeshBasicMaterial( {color: colors[2], side: THREE.DoubleSide} );
        for(let i=0;i<this.ribbonsCant;i++){
            const geometryRibbon = new THREE.PlaneGeometry( 40, 1,50,1 );

            const planeRibbon = new THREE.Mesh( geometryRibbon, materialRibbon );
            planeRibbon.position.y=-(this.ribbonsCant/2)+i*1;
            this.geometryRibbons.push(geometryRibbon);
            this.centro4.add(planeRibbon);
        }

        const pisoGeo = new THREE.PlaneGeometry(40, this.ribbonsCant*0.95)
        const materialPiso = new THREE.MeshBasicMaterial( { color: colors[1] } );
        const piso = new THREE.Mesh(pisoGeo, materialPiso);
        piso.position.set(0,0,-0.1);
        this.centro4.add(piso);


        this.centro4.position.z=0;
        this.centro4.position.y=4;
        this.centro4.rotation.z=Math.PI*0.5;
        this.centro4.rotation.x=-Math.PI*0.2;

        this.Part4.add(this.centro4);

        this.clock = new THREE.Clock();
        this.perlin = new ImprovedNoise();

        this.power1=20;
        this.power2=0.09;
        this.power3=15;

        this.scene.add(this.Part4);

        this.scene.background = new THREE.Color( this.colors[2] );
        this.colorGlobal1=new THREE.Color( this.colors[2] );
        this.colorGlobal2=new THREE.Color( this.colors[1] );
        this.colorAnimMain=new THREE.Color(this.colors[0]);
        this.colorAnimSecond=new THREE.Color(this.colors[1]);
        this.colorAnimThird=new THREE.Color(this.colors[2]);
        this.colorAnimFourth=new THREE.Color(0x86BCAE);
        this.colorAnimFive=new THREE.Color(0x3DF9CC);



    }
    InternalProcess(){
        const time = this.clock.getElapsedTime();
        for(let i=0;i<this.ribbonsCant;i++){
            const b = this.geometryRibbons[i].attributes.position.array;

            let vM=map_range(i,0,this.ribbonsCant,-1,1);
            vM=(Math.abs(vM));
            vM=this.manager.getTweenedValueQuadIn(0,1,vM);
            
            let vH=vM*((this.ribbonsCant/2)*0.95);
            
            
            for ( let n = 0; n < b.length; n +=3 ) {
                const x=this.perlin.noise(time+b[n]*this.power2,i,0);
                let v=map_range(b[n],-this.power1+vH,this.power1-vH,-1,1);
                v=1-Math.abs(v);

                v=this.manager.getTweenedValueQuadInOut(0,1,v);
                let v2= x;
                v2=map_range(v2,-1,1,0,this.power3);
                b[n+2] = v2 *v*(1-vM);
            }
            
            this.geometryRibbons[i].attributes.position.needsUpdate = true;
        }
    }
    Process(manager, vals, delta){
        this.manager=manager;
        //console.log(vals.tracker2.progress());

        let val1 = vals.tracker1.progress();//THREE.MathUtils.clamp(vals[0].v3,-1,1);
        let val2 = vals.tracker2.progress();//THREE.MathUtils.clamp(vals[4].inTransition,0,1);
        /*let val3 = THREE.MathUtils.clamp(vals[5].inTransition,0,1);
        let val4 = THREE.MathUtils.clamp(vals[6].inTransition,0,1);
        let val5 = THREE.MathUtils.clamp(vals[8].inTransition,0,1);
        let val6 = THREE.MathUtils.clamp(vals[10].inTransition,0,1);
        let val7 = THREE.MathUtils.clamp(vals[13].inTransition,0,1);*/

        let cZ=manager.getTweenedValueQuadInOut(20,28,val1,1,0);
        let rX=manager.getTweenedValueQuadInOut(-Math.PI*0.2,-0.5,val2);
        let rZ=manager.getTweenedValueQuadInOut(Math.PI*0.5,0,val2);
        /*let rZ2=manager.scrollyteller.getTweenedValueQuadInOut(0,-Math.PI*0.5,val5);
        let cZ2=manager.scrollyteller.getTweenedValueQuadInOut(0,-8,val4);
        let cZ3=manager.scrollyteller.getTweenedValueQuadInOut(0,-4,val5);*/

        //power2=manager.scrollyteller.getTweenedValueQuadInOut(0.09,0.05,val5);
        //power3=manager.scrollyteller.getTweenedValueQuadInOut(15,10,val5);
        this.camera.position.z=cZ;//+cZ2+cZ3;
        this.centro4.rotation.x=rX;//+val6;
        this.centro4.rotation.z=rZ;//+rZ2;
        //controller.centro4.position.y=4+(val7*-12);

        this.InternalProcess();

        /*if(val5<=0){
            colorGlobal1.lerpColors(colorAnimThird,colorAnimFourth,val3);
            colorGlobal2.lerpColors(colorAnimSecond,colorAnimThird,val3);
        }else if(val7<=0){
            colorGlobal1.lerpColors(colorAnimFourth,colorAnimMain,val5);
            colorGlobal2.lerpColors(colorAnimThird,colorAnimFive,val5);
        }else{
            colorGlobal1.lerpColors(colorAnimMain,colorAnimFourth,val7);
            colorGlobal2.lerpColors(colorAnimFive,colorAnimSecond,val7);
        }
        materialRibbon.color.set(colorGlobal1);
        materialPiso.color.set(colorGlobal2);
        scene.background=colorGlobal1;*/
    }
    
}
export default Cintas;