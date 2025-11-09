


export default class Keyword {

    #type
    #name

    constructor(type,name) {

        this.#type = type
        this.#name = name
    }

    get type() {
        return this.#type
    }

    get name() {
        return this.#name
    }

}