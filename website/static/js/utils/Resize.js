class Resize{
    constructor() {
        
    }
    start(delegated){
        this.delegated=delegated;
        window.addEventListener("resize", this.resize.bind(this));
    }
    stop(){
        window.removeEventListener("resize", this.resize.bind(this));
    }
    resize(){
        this.delegated();
    }
}
const resizeController = new Resize();

export default resizeController;