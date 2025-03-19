class ProtoStruct{
    constructor(scene,camera, colors, params) {
        this.camera=camera;
        this.scene=scene;
        this.colors=colors;
        this.buildParams=params;
        this.enabled=false;
    }
    Process(manager, vals, delta){

    }
    Update(delta){

    }
    Enable(){
        if(this.enabled) return
        //this.timeline.Add(this.Update);
        this.enabled=true;
    }
    Disable(){
        if(!this.enabled) return;
        this.enabled=false;
        //this.timeline.Remove(this.Update);
    }
}
export default ProtoStruct