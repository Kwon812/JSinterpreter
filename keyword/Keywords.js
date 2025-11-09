


export default class Keywords {

    #keywords=[]
    constructor(keywords) {

        this.#keywords = keywords
    }

    isValidKeyword(type,name){
        return !!this.#keywords.find(keyword => keyword.name === name && keyword.type === type)
    }
}