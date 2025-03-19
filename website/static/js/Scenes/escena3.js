import * as THREE from 'three';
import ProtoScene from './protoscene.js';
import City from './Structs/city.js';

class Escena3 extends ProtoScene{
    constructor(){
        super();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.outerHeight, 0.1,2000);
        this.scene.add(this.camera);
        
        
    }
    Build(){
        this.camera.position.set(0, 4, 4);
        this.camera.lookAt(0,0,0);

        this.structs.push(new City(this.scene, this.camera, [0x182939,0xFC573B,0xE8E5E0,0x193A49]))
        
    }
    
}

export default Escena3;