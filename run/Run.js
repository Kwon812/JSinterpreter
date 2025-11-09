import {EventLoop} from "../test.js";

export default class Run {

    #envs
    #eventLoop
    constructor(envs) {
        this.#envs = envs;
        this.#eventLoop=new EventLoop()
    }


    eval(node) {
        switch (node.type) {

            case 'Redefine':
            case 'Variable':

                this.#eventLoop.call(()=>this.#envs.addEnv(node.name, node.t, this.eval(node.value)))
                break;

            case 'Print':
                this.#eventLoop.call(()=>console.log(this.eval(node.expression)))
                break;

            case 'Fun':
                this.#eventLoop.call(()=>this.#envs.addEnv(node.name, node.t, node.body, node.params,node.event))
                break;

            case 'If':
                this.#eventLoop.call(() => {
                    if (this.eval(node.expression)) {
                        this.eval(node.run);
                    }
                });
                break;
            case 'For':
                this.#eventLoop.call(() => {
                    let count = 0
                    while (count++ < node.count) {
                        node.body.forEach(nd => this.eval(nd))
                    }
                })
                break;
            case 'From':
                this.#eventLoop.call(()=> {
                    let start = node.start
                    const end = node.end
                    const param = node.param
                    this.#envs.pushEnvsScope()

                    this.#envs.addEnv(param, 'let', start)
                    for (start; start <= end; start++) {
                        this.#envs.addEnv(param, null, start)
                        node.body.forEach(nd => {
                            this.eval(nd)
                        })
                        start = this.#envs.getValueByName(param)
                    }


                    this.#envs.popEnvsScope()
                })
                break;
            case 'FunExecute':
                // console.log(node)
                const event = this.#envs.getEventByName(node.value.name)
                const body = this.eval(node.value)
                const callback=()=>{


                    this.#envs.pushEnvsScope()
                    const params = this.#envs.getParamsByName(node.value.name)
                    params.forEach((param, i) => {
                        this.#envs.addEnv(param, 'const', node.params[i],)
                    })
                    body.forEach(nd => {
                        this.eval(nd)
                    })
                    this.#envs.popEnvsScope()
                }
                this.#eventLoop.init([event,callback])

                // this.#eventLoop.run()
                break;

            case 'Identifier':
                return this.#envs.getValueByName(node.name)

            case "String":
            case 'Number':
                const {value, t, type} = node
                return value

            case 'BinaryExpression':
                const operator = node.operator
                const left = this.eval(node.left)
                const right = this.eval(node.right)

                if (typeof left !== typeof right) {
                    throw 'different type'
                }
                switch (operator) {
                    case '+':
                        return left + right
                    case '-':
                        return left - right
                    case '<':
                        return left < right
                    case '>':
                        return left > right
                    case '*':
                        return left*right
                    case '/':
                        return left/right
                    case '%':
                        return left %right
                }
        }

    }

    run(ast) {
        ast.forEach(node=> {
            this.eval(node)
            this.#eventLoop.run()
        })

        // this.#envs.getAll()
        // console.log(this.#env)
    }

}