import Env from "./Env.js";


export default class EnvsService {

    #envs=[[]]

    constructor(envs) {
        // this.#envs = envs;
    }

    envsSize(){
        return this.#envs.length;
    }

    peek(){
        return this.#envs[this.#envs.length-1]
    }
    pushEnvsScope(){
        this.#envs.push([])
    }
    popEnvsScope(){
        this.#envs.pop()
    }

    findEnvByName(name){

        let a

        let scope
        this.#envs.findLast((envs,i)=> {
            const found=envs.findLast(env => env.name === name)
            if(found) {
                a = found
                scope=i
                return a
            }
            return false
        })
        return a ? [a,scope] : [undefined,undefined]
    }


    getAll(){
        return this.#envs.map(env=>env.map(e=>e.name))
    }
    getValueByName(name) {
        const [env,scope] = this.findEnvByName(name)

        // console.log(env)
        if (!env) throw `${name} is not defined`
        return env.value
    }

    getEventByName(name){
        // console.log(this.#envs)
        const [env,scope] = this.findEnvByName(name)

        if (!env) throw `${name} is not defined`
        return env.event
    }
    getParamsByName(name) {
        const [env,scope] = this.findEnvByName(name)

        if (!env) throw `${name} is not defined`
        return env.params
    }

    addEnv(name, type, value, keyword,event) {

        // console.log('add')
        // let currentScopeEnv= this.peek().findLast(env=>env.name===name)
        let [env,scope]=this.findEnvByName(name)
        const currentScope=this.#envs.length-1

        if(env){
            if(scope===currentScope){
                if (env.type === 'const') throw `can't not changed const variable "${name}"`
                if (type) throw `already defined  variable "${name}"`
                console.log(`[SYSTEM] changed Variable ${env.name} ${env.value}->${value}`)
                return this.peek().push(new Env(name, value, type, keyword,event))
            }
            if(scope!==currentScope && !type){
                if (env.type === 'const') throw `can't not changed const variable "${name}"`
                console.log(`[SYSTEM] changed Variable ${env.name} ${env.value}->${value}`)
                return this.#envs[scope].push(new Env(name, value, type, keyword,event))
            }
        }
        if (!type) {
            throw `${name} is not defined`
        }
        this.peek().push(new Env(name, value, type, keyword,event))
        // console.log(this.#envs)
    }


}