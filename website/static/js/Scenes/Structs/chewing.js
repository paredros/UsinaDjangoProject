import ProtoStruct from "./protostruct.js";
import * as THREE from 'three';
import { ImprovedNoise } from 'three/addons/math/ImprovedNoise.js';


const gradientFrag=`
varying vec2 vUv;
uniform vec3 uColorA;
uniform vec3 uColorB;
void main(){
  gl_FragColor = vec4(
    mix( uColorA, uColorB, vec3(vUv.y)),
    1.
  );
}
`;
const gradientVert=`
varying vec2 vUv;
void main(){
  vUv = uv;
  float depth = -1.; //or maybe 1. you can experiment
  gl_Position = vec4(position.xy, depth, 1.);
}`;

class Chewing extends ProtoStruct{
    constructor(scene,camera, colors, params){
        super(scene,camera,colors,params);

        this.vertex = 40;
        this.bubbleGeometry = new THREE.SphereGeometry( 120, this.vertex, this.vertex );
        this.originals = this.bubbleGeometry.attributes.position.array.slice(0);

        let bubble;

        const bubbleMaterial = new THREE.MeshStandardMaterial({
            color: 0x2AFFEA,
            emissive: colors[1],//0xbd4be3,
            emissiveIntensity: 0.5,
            roughness: 0.61,
            metalness: 0.21,
            side: THREE.FrontSide,
            /*wireframe: true*/
        });
        bubble = new THREE.Mesh(this.bubbleGeometry, bubbleMaterial);
        bubble.castShadow = false;
        bubble.receiveShadow = false;

        this.CreateLights();

        var myGradient = new THREE.Mesh(
            new THREE.PlaneGeometry(2,2,1,1),
            new THREE.ShaderMaterial({
                uniforms: {
                uColorA: { value: new THREE.Color(0x2AFFEA) },
                uColorB: { value: new THREE.Color(colors[1]) }
                },
                vertexShader: gradientVert,
                fragmentShader: gradientFrag
        }))
        myGradient.material.depthWrite = false
        myGradient.renderOrder = -99999;
        myGradient.rotateY=Math.PI/2;
        this.scene.add(myGradient);
        this.scene.add(bubble);
    
        this.clock = new THREE.Clock();
        this.perlin = new ImprovedNoise();
        scene.background = new THREE.Color( colors[2] );
    }
    CreateLights(){
        this.hemisphereLight = new THREE.HemisphereLight(0xffffff,0x000000, .5)
          
        this.shadowLight = new THREE.DirectionalLight(0xff8f16, .4);
        this.shadowLight.position.set(0, 450, 350);
        this.shadowLight.castShadow = false;

        this.light2 = new THREE.DirectionalLight(0xfff150, .25);
        this.light2.position.set(-600, 350, 350);
        
        this.light3 = new THREE.DirectionalLight(0xfff150, .15);
        this.light3.position.set(0, -250, 300);
    
        this.scene.add(this.hemisphereLight);  
        this.scene.add(this.shadowLight);
        this.scene.add(this.light2);
        this.scene.add(this.light3);
    }
    Process(manager, vals, delta){
        this.manager=manager;
        let val1 = vals.tracker4.progress();//THREE.MathUtils.clamp(vals[8].inTransition,0,1);
        //console.log("PROCESA");
        let time = this.clock.getElapsedTime()*(0.1);//+val1);
        if(val1>0){
            time=this.clock.getElapsedTime()*(0.9);
        }
        const b = this.bubbleGeometry.attributes.position.array;
        for ( let n = 0; n < b.length; n +=3 ) {
            const power=0.005+(val1*0.002);
            const altura=0.9+(val1*0.9);
            const val=this.perlin.noise(this.originals[n]*power+time,this.originals[n+1]*power+time,this.originals[n+2]*power);
            b[n]=this.originals[n]+(this.originals[n]*val*altura);
            b[n+1]=this.originals[n+1]+(this.originals[n+1]*val*altura);
            b[n+2]=this.originals[n+2]+(this.originals[n+2]*val*altura);
        }
        this.bubbleGeometry.attributes.position.needsUpdate = true;

        let cZ=manager.getTweenedValueQuadInOut(340,310,val1,0.6);
        let cX=manager.getTweenedValueQuadInOut(0,100,val1,0.6);

        this.camera.position.set(cX,0,cZ);
    }
}

export default Chewing;