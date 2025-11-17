


export default class KeywordStore {

    #keywords=[]
    constructor(keywords) {

        this.#keywords = keywords
    }

    isValidKeyword(type,name){
        return !!this.#keywords.find(keyword => keyword.name === name && keyword.type === type)
    }
}