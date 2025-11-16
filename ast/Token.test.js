import Token from "./Token.js";


describe('Token class test',()=>{



    test('string tokenize test',()=>{

        const input=
            'let a=10' +
            'a+b'
        const result=Token.tokenize(input)
        // console.log(result)
        expect(result).toEqual(['let','a','=','10','a','+','b'])


    })
})