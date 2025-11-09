

export default class Env{


    #name
    #value
    #type
    #params
    constructor(name,value,type,params){
        this.#name = name
        this.#value= value
        this.#type = type
        this.#params= params
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

    get type() {
        return this.#type
    }

    get params(){
        return this.#params
    }

}