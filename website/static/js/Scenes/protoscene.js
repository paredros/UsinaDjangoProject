class ProtoScene{
    constructor(){
        this.enabled=false;
        this.structs=[];
    }
    Build(){
        
    }
    Enable(){
        if(this.enabled) return;
        this.enabled=true;
        this.structs.forEach((s)=>s.Enable());

    }
    Disable(){
        if(!this.enabled) return;
        this.enabled=false;
        this.structs.forEach((s)=>s.Disable());
    }
    Process(manager, vals, delta){
        if(!this.enabled) return;
        this.structs.forEach((s)=>s.Process(manager, vals, delta));
    }
    OnResize(){
        this.structs.forEach((s)=>{
            s.camera.aspect=window.innerWidth / window.outerHeight;
            s.camera.updateProjectionMatrix();
        })
    }
}
export default ProtoScene;