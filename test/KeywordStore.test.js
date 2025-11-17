import KeywordStore from "../keyword/KeywordStore.js";
import Keyword from "../keyword/Keyword.js";


describe('KeywordStore test', () => {

    test('init keywords & validate test',()=>{

        const keywords = new KeywordStore([new Keyword('print','name')])
        const truly=keywords.isValidKeyword('print','name')
        const fasly=keywords.isValidKeyword('nothing','nothing')
        expect(truly).toBe(true)
        expect(fasly).toBe(false)
    })
})