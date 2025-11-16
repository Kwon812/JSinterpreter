

export default class Env{


    #name
    #value
    #type
    #params
    #event
    constructor(name,value,type,params,event){
        this.#name = name
        this.#value= value
        this.#type = type
        this.#params= params
        this.#event = event
    }

    changeValue(value){
        this.#value = value
    }

    get name() {
        return this.#name
    }
    get value() {
        return this.#value
    }

    get event(){
        return this.#event
    }
    get type() {
        return this.#type
    }

    get params(){
        return this.#params
    }

    getVariable(){
        return {
            type:this.type,
            name:this.name,
            value:this.value

        }
    }
}