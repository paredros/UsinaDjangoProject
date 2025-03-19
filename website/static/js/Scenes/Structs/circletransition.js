import * as THREE from 'three';
import ProtoStruct from './protostruct.js';

class CircleTransition extends ProtoStruct{
    constructor(scene,camera, colors, params){
        super(scene,camera,colors,params);

        const geometry = new THREE.CircleGeometry( 5, 32 ); 
        this.material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
        this.circle = new THREE.Mesh( geometry, this.material ); 
    
        this.circle.position.z=-5;
        //circle.visible=false;
        this.circle.scale.set(0,0,0);
        this.scene.add( this.circle );
        this.camera.add(this.circle);
    }
    Process(manager, vals, delta){
        this.manager=manager;

        let s=0;
        let x=-5;
        const param1=vals.tracker2.progress();
        if(param1>=0 && param1<=1){
            let val1 = THREE.MathUtils.clamp(param1,0,1);
            let val1B=val1;
            val1-=0.5;
            val1*=2;
            val1=1-Math.abs(val1);
            s=manager.getTweenedValueQuadInOut(0,2,val1);
            x=manager.getTweenedValueQuadInOut(-5,5,val1B);
            this.material.color.set(0xffff00);
        }
        this.circle.scale.set(s,s,s);
        this.circle.position.x=x;
    }
}
export default CircleTransition;