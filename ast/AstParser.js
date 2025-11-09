
export default class AstParser {


    #tokens
    #pos = 0
    #keywords = []

    constructor(tokens, keywords) {
        this.#tokens = tokens
        this.#keywords = keywords
    }

    #parseAst() {


        const token = this.#tokens[this.#pos]
        if (this.#keywords.isValidKeyword('Variable', token)) {
            const name = this.#tokens[++this.#pos]
            const sp = this.#tokens[++this.#pos]
            if (!/[=+]+/.test(sp)) throw `WRONG SP ${sp}`
            const value = this.#parseValue(this.#tokens[++this.#pos])
            // console.log(value)
            // const parsed=Parser.parseValue(this.#pos,this.#tokens)
            // console.log(value.cursor,value.contents)
            // this.#pos =parsed.cursor
            return {
                type: 'Variable',
                name,
                t: token,
                value: {...value}


            }
        }
        if (this.#keywords.isValidKeyword('Print', token)) {
            const expression = this.#parseValue(this.#tokens[++this.#pos])
            return {
                type: 'Print',
                expression
            }
        }
        if (this.#keywords.isValidKeyword('If', token)) {
            const expression = this.#parseValue(this.#tokens[++this.#pos])
            return {
                type: 'If',
                run: this.#parseAst(this.#tokens[++this.#pos]),
                expression
            }
        }
        if (this.#keywords.isValidKeyword('Fun', this.#tokens[this.#pos+1])) {
            this.#pos++
            const name=this.#tokens[++this.#pos]
            const params=this.#parseParams()
            const body=this.#parseBlock()
            // const [params,body] = this.#parseFunction()
            // console.log(expression)
            return {
                type: 'Fun',
                t:'fun',
                event:token,
                // name:name.replace('()',''),
                name,
                params,
                body
            }
        }
        if(this.#keywords.isValidKeyword('For', token)) {
            // console.log("dnajwe")
            const count= this.#parseParams()
            // console.log(count)
            const body=this.#parseBlock()
            // console.log(count,body)
            return {
                type: 'For',
                count,
                body
            }
        }

        if(this.#keywords.isValidKeyword('From', token)) {
            const from=this.#parseFrom()
            const body=this.#parseBlock()
            return {
                type:'From',

                ...from,
                body
            }
        }

        if (/^\(.*|[\w,]+\)$/.test(this.#tokens[this.#pos + 1] )) {

            const event=this.#tokens[this.#pos]
            // this.#pos++
            // console.log("ajs")
            const name=this.#tokens[this.#pos]

            const value=this.#parseValue(name)
            // console.log('dsaas')
            const params=this.#parseParams()
            // console.log(params)
            return {
                type:'FunExecute',
                params,
                value
            }
        }


        if (this.#tokens[this.#pos + 1] === '=') {
            const name = token
            const value = this.#parseValue(this.#tokens[this.#pos += 2])
            return {
                type: 'Redefine',
                name,
                value
            }
            // console.log("dnsje")
        }

        throw `WRONG KEYWORD ${token}`


    }
    #parseFrom(){
        this.#pos++
        const [start,_,end,param]=this.#tokens.slice(this.#pos,this.#pos+4).map((t,i)=>{

            if(i===1 && t !=='to') {

                throw 'EXPECTED TO'
            }
            if(i===3 && isNaN(t)){
                return t

            }
            return Number(t)
        })
        this.#pos+=3
        return {
            start,
            end,
            param
        }
    }
    #parseBinary() {
        this.#pos++
        const operator = this.#tokens[this.#pos]
        const left = this.#parseValue(this.#tokens[this.#pos - 1])
        this.#pos++
        const right = this.#parseValue(this.#tokens[this.#pos])
        return {type: 'BinaryExpression', operator, left, right}
    }

    #parseFunction() {

        return [this.#parseParams(),this.#parseBlock()]

    }
    #parseParams(){
        this.#pos++
        const regex=/^\(.*|[\w,]+\)$/
        const form=this.#tokens[this.#pos]
        const filter=form.match(regex)
        // console.log(filter)
        if(!filter) throw `WRONG FORM ${form}`
        return form.slice(1, form.length - 1).split(',').map(param=>Number(param.trim()) || param.trim())
    }


    #parseBlock(){
        this.#pos++;
        const start = this.#tokens[this.#pos];
        if (start !== '{') throw 'WRONG FUNCTION EXPECT {'
        const block=[]
        this.#pos++
        while (this.#tokens[this.#pos] !== '}') {
            block.push(this.#parseAst())
            this.#pos ++
        }
        return block
    }
    #parseValue(value) {
        if (!value) throw `WRONG VALUE ${value}`
        //binary edit
        if (/[+\-\<\>\*\%\/]/.test(this.#tokens[this.#pos + 1])) {
            return this.#parseBinary()
        }


        if (!isNaN(value)) {
            return {type: 'Number', value: Number(value)}
        }
        if (/^[A-Za-z]+$/.test(value)) {
            return {type: 'Identifier', name: value};
        }
        if (/^".*"$/.test(value)) {
            return {type: 'String', value: value.replaceAll("\"", "")};
        }
        throw `WRONG VALUE ${value}`


    }


    parse() {

        const ast = []
        // console.log(this.#parseAst())
        while (this.#pos < this.#tokens.length) {
            ast.push(this.#parseAst())
            ++this.#pos
        }
        return ast
    }


}



