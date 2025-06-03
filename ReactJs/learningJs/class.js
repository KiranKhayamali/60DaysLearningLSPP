class car{
    constructor(name){
        this.brand = name;
    }

    present(){
        return ('I have a ' + this.brand);
    }
}

//Class Inheritance
class Model extends Car {
    constructor(name, mod) {
        super(name);    
        this.model = mod;
    }  
    show() {
        return (this.present() + ', it is a ' + this.model);
    }
}
const mycar = new Model("Ford", "Mustang");

mycar.show();