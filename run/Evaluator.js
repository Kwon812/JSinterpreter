


export default class Evaluator {


    #envs

    constructor(eventLoop,envs) {
        this.eventLoop = eventLoop
        this.#envs = envs

    }

    eval(node) {
        switch (node.type) {

            case 'Redefine':
            case 'Variable':

                this.#envs.addEnv(node.name, node.t, this.eval(node.value))
                break;

            case 'Print':
                console.log(this.eval(node.expression))

                break;


            case 'If':

                if (this.eval(node.expression)) {
                    this.eval(node.run);
                }
                break;
            case 'For':
                let count = 0
                while (count++ < node.count) {
                    node.body.forEach(nd => this.eval(nd))
                }
                break;
            case 'From':
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
                break;
            case 'FunExecute':
                const event = this.#envs.getEventByName(node.value.name)
                const body = this.eval(node.value)
                const env=this.#envs

                const callback = () => {


                    const params = this.#envs.getParamsByName(node.value.name)

                    params.forEach((param, i) => {
                        this.#envs.addEnv(param, 'const', node.params[i],)
                    })
                    body.forEach(nd => {
                        this.eval(nd)
                    })

                }
                this.eventLoop.init(event,{env, callback},node.value.name)
                break;

            case 'Fun':
                this.#envs.addEnv(node.name, node.t, node.body, node.params, node.event)
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
                        return left * right
                    case '/':
                        return left / right
                    case '%':
                        return left % right
                }
        }

    }

}