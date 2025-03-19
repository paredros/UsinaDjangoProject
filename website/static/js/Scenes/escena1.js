import * as THREE from 'three';
import ProtoScene from './protoscene.js';
import Cintas from './Structs/cintas.js';
import CircleTransition from './Structs/circletransition.js';

class Escena1 extends ProtoScene{
    constructor(){
        super();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.outerHeight, 0.1,2000);
        this.scene.add(this.camera);
        
    }
    Build(){
        this.camera.position.set(0, 0, 20);
        this.camera.lookAt(0,0,0);


        this.structs.push(new Cintas(this.scene, this.camera, [0x182939,0xFC573B,0xE8E5E0,0x193A49]))
        this.structs.push(new CircleTransition(this.scene, this.camera, [0x182939,0xFC573B,0xE8E5E0,0x193A49]))
    }

}

export default Escena1;