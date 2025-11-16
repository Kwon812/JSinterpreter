import AstParser from "./AstParser.js";
import Token from "./Token.js";
import Keywords from "../keyword/Keywords.js";
import Keyword from "../keyword/Keyword.js";


describe('AstParser test', () => {


    const string='let a=10' +
        'const b=20' +
        'print 10'


    const tokens= [
        'let',   'a',
        '=',     '10',
        'const', 'b',
        '=',     '20',
        'print', '10'
    ]
    const keywords=new Keywords(
        [new Keyword('Variable', 'let'),
            new Keyword('Variable', 'const'),
            new Keyword('Print', 'print'),
        ]
    )
    test('토큰 평가 테스트',()=>{



        const result=new AstParser(tokens,keywords).parse(tokens,keywords)

        expect(result).toEqual([
            {
                type: 'Variable',
                name: 'a',
                t: 'let',
                value: { type: 'Number', value: 10 }
            },
            {
                type: 'Variable',
                name: 'b',
                t: 'const',
                value: { type: 'Number', value: 20 }
            },
            { type: 'Print', expression: { type: 'Number', value: 10 } }
        ])
    })
})