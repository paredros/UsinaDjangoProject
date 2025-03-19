import * as THREE from 'three';
import ProtoStruct from './protostruct.js';
import { ImprovedNoise } from 'three/addons/math/ImprovedNoise.js';

function mathRandom(num = 8) {
    var numValue = - Math.random() * num + Math.random() * num;
    return numValue;
  };

class City extends ProtoStruct{
    constructor(scene,camera, colors, params){
        super(scene,camera,colors,params);

        this.city = new THREE.Object3D();
        this.smoke = new THREE.Object3D();
        this.town = new THREE.Object3D();
    
        this.pivot=new THREE.Object3D();
        this.pivot.add(this.camera);
        this.camera.lookAt(0,1,0);
        this.scene.add(this.pivot);
        this.createCarPos = true;
        this.uSpeed = 0.001;

        this.setcolor = colors[1];
    
        this.scene.background = new THREE.Color(this.setcolor);
        this.scene.fog = new THREE.Fog(this.setcolor, 4, 12);
        
        this.cars1=[];
        this.cars2=[];

        var segments = 2;
        for (var i = 1; i<100; i++) {
            var geometry = new THREE.BoxGeometry(1,1,1,segments,segments,segments);
            var material = new THREE.MeshStandardMaterial({
                color:colors[0],
                wireframe:false,
                roughness: 0.5,
                metalness: 1.05,
                flatShading: false,
                side:THREE.DoubleSide
            });
            var wmaterial = new THREE.MeshLambertMaterial({
                color:0xFFFFFF,
                wireframe:true,
                transparent:true,
                opacity: 0.03,
                side:THREE.DoubleSide
            });
        
            var cube = new THREE.Mesh(geometry, material);
            //var wire = new THREE.Mesh(geometry, wmaterial);
            var floor = new THREE.Mesh(geometry, material);
            //var wfloor = new THREE.Mesh(geometry, wmaterial);
            
            cube.castShadow = true;
            cube.receiveShadow = true;
            cube.rotationValue = 0.5+Math.abs(mathRandom(8/2));
            
            floor.scale.y = 0.05;
            cube.scale.y = 0.1+Math.abs(mathRandom(8));
            
            var cubeWidth = 0.9;
            cube.scale.x = cube.scale.z = cubeWidth+mathRandom(1-cubeWidth);
            //cube.position.y = cube.scale.y / 2;
            cube.position.x = Math.round(mathRandom());
            cube.position.z = Math.round(mathRandom());
            
            floor.position.set(cube.position.x, 0/*floor.scale.y / 2*/, cube.position.z)
            
            this.town.add(floor);
            this.town.add(cube);
        };
        //----------------------------------------------------------------- Particular
        
        var gmaterial = new THREE.MeshToonMaterial({color:0xFF0000, side:THREE.DoubleSide});
        var gparticular = new THREE.CircleGeometry(0.01, 3);
        var aparticular = 5;
        
        for (var h = 1; h<300; h++) {
            var particular = new THREE.Mesh(gparticular, gmaterial);
            particular.position.set(mathRandom(aparticular), mathRandom(aparticular),mathRandom(aparticular));
            particular.rotation.set(mathRandom(),mathRandom(),mathRandom());
            this.smoke.add(particular);
        };
        
        var pmaterial = new THREE.MeshPhongMaterial({
            color:0x000000,
            side:THREE.DoubleSide,
            opacity:0.9,
            transparent:true});
        var pgeometry = new THREE.PlaneGeometry(60,60);
        var pelement = new THREE.Mesh(pgeometry, pmaterial);
        pelement.rotation.x = -90 * Math.PI / 180;
        pelement.position.y = -0.001;
        pelement.receiveShadow = true;
        
        
        this.city.add(pelement);

        var ambientLight = new THREE.AmbientLight(0xFFFFFF, 40);
        var lightFront = new THREE.SpotLight(0xFFFFFF, 2000, 0);
        var lightBack = new THREE.PointLight(0xFFFFFF, 100.5);

        lightFront.position.set(20, 20, 20);
        lightFront.lookAt(0,0,0);

        lightBack.position.set(0,6,0);

        this.smoke.position.y = 2;
        
        scene.add(ambientLight);
        this.city.add(lightFront);
        scene.add(lightBack);
        scene.add(this.city);
        this.city.add(this.smoke);
        this.city.add(this.town);

        var gridHelper = new THREE.GridHelper( 60, 120, 0xFF0000, 0x000000);
        this.city.add( gridHelper );

        /*for (var i = 0; i<60; i++) {
            this.CreateCars(0.1, 20);
        };*/
        this.accum=0;
    }
    CreateCars(cScale = 2, cPos = 20, cColor = 0xFF0900){
        var cMat = new THREE.MeshToonMaterial({color:cColor, side:THREE.DoubleSide});
        var cGeo = new THREE.BoxGeometry(1, cScale/40, cScale/40);

        var cElem = new THREE.Mesh(cGeo, cMat);
        var cAmp = 6;
        
        if (this.createCarPos) {
            this.createCarPos = false;
            cElem.position.x = -cPos;
            cElem.position.z = (mathRandom(cAmp));
            cElem.delay=mathRandom(3);
            this.cars1.push(cElem);
            
        } else {
            this.createCarPos = true;
            cElem.position.x = (mathRandom(cAmp));
            cElem.position.z = -cPos;
            cElem.rotation.y = 90 * Math.PI / 180;
            cElem.delay=mathRandom(3)
            this.cars2.push(cElem);
            //TweenMax.to(cElem.position, 5, {z:cPos, repeat:-1, yoyo:true, delay:mathRandom(3), ease:Power1.easeInOut});
        };
        cElem.receiveShadow = true;
        cElem.castShadow = true;
        cElem.position.y = Math.abs(mathRandom(5));
        this.city.add(cElem);
    }
    Process(manager,vals, delta){
        this.manager=manager;
        this.smoke.rotation.y += 0.01;
        this.smoke.rotation.x += 0.01;
        this.pivot.rotation.y+=0.001;
        this.accum+=delta*0.001;

        let val1 = vals.tracker6.value;//.progress();
        let val2 = vals.tracker7.progress();
        let val3 = vals.tracker8.value;
        
        let ccY=manager.getTweenedValueQuadInOut(6,4,val1);
        let pcY=manager.getTweenedValueQuadInOut(0,2,val2);
        let ccY2=manager.getTweenedValueQuadInOut(0,-2,val2);
        let ccZ=manager.getTweenedValueQuadInOut(0.1,4,val1);
        let ccZ2=manager.getTweenedValueQuadInOut(0,7,val3);
        this.camera.position.y=ccY+ccY2;
        this.camera.position.z=ccZ+ccZ2;
        this.camera.lookAt(0,pcY,0);

        
        /*for(let i=0;i<this.cars1.length;i++){
            let t1=((this.accum+this.cars1[i].delay)%1)/1;
            let cX=manager.getTweenedValueQuadInOut(-8,8,t1);
            this.cars1[i].position.x=cX;
        }
        for(let i=0;i<this.cars2.length;i++){
            let t1=((this.accum+this.cars2[i].delay)%2)/2;
            let cZ=manager.getTweenedValueQuadInOut(-8,8,t1);
            this.cars2[i].position.z=cZ;
        }*/
    }
    Update(delta){
        console.log(this.smoke);
        //this.smoke.rotation.y += 0.01;
        //this.smoke.rotation.x += 0.01;
        //this.pivot.rotation.y+=0.001;
        //this.accum+=delta;
    }
}
export default City;