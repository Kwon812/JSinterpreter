import Env from "../envs/Env.js";
import EnvsService from "../envs/EnvsService.js";

describe('EnvsService test', () => {

    let env;
    let envsController;
    let logSpy;

    beforeEach(() => {
        env = new Env('a','10','let')
        envsController = new EnvsService()

        logSpy = jest.spyOn(console, 'log')
    })

    afterEach(() => {
        logSpy.mockRestore()
    })

    test('push new envs Scope test',()=>{
        envsController.pushEnvsScope()
        expect(envsController.envsSize()).toBe(2)
    })
    test('find Env test',()=>{
        // envsController.findEnvByName = jest.fn(() => [env, 0])
        envsController.addEnv('a','let','10')
        const [env,scope]=envsController.findEnvByName('a')
        expect(env.getVariable()).toEqual({type:'let',name:'a',value:'10'})
        expect(scope).toBe(0)
    })


    test('variable keyword redefine test', () => {
        envsController.findEnvByName = jest.fn(() => [env, 0])

        expect(() => envsController.addEnv('a', 'let', '10'))
            .toThrow('already defined  variable "a"')
    })

    test('const variable redefine test', () => {
        envsController.findEnvByName = jest.fn(() => [new Env('a', '20', 'const'), 0])

        expect(() => envsController.addEnv('a', '', '10'))
            .toThrow(`can't not changed const variable "a"`)
    })

    test('variable redefine test', () => {
        envsController.findEnvByName = jest.fn(() => [env, 0])

        envsController.addEnv('a', '', '20')

        expect(logSpy).toHaveBeenCalledWith('[SYSTEM] changed Variable a 10->20')
    })

    test('variable scope test', () => {
        envsController.findEnvByName = jest.fn(() => [new Env('a', '10', 'let'), 0])

        // push new scope
        envsController.pushEnvsScope()

        // redefine upper var
        envsController.addEnv('a', '', '20')
        expect(logSpy).toHaveBeenLastCalledWith('[SYSTEM] changed Variable a 10->20')

        // define new variable in inner scope
        envsController.addEnv('a', 'let', '30')
        expect(envsController.peek()[0].getVariable())
            .toEqual({ type: 'let', name: 'a', value: '30' })
    })

})
