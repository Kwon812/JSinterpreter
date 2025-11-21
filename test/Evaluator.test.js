import EnvsService from "../envs/EnvsService.js";
import EventLoop from "../eventLoop/EventLoop.js";
import Evaluator from "../run/Evaluator.js";

describe('evaluator test', () => {

    let envsService;
    let eventLoop;
    let evaluator;
    let logSpy;

    beforeEach(() => {
         envsService=new EnvsService()
         eventLoop=new EventLoop()

        envsService.addEnv=jest.fn()
        logSpy=jest.spyOn(console, 'log')
        evaluator=new Evaluator(eventLoop,envsService)
    })
    afterEach(() => {
        envsService.addEnv.mockRestore()
        logSpy.mockRestore()
    })

    test('run Variable test',()=>{



        const input = {
            type: 'Variable',
            name: 'name',
            t: 'let',
            value: { type: 'Number', value: 10 }
        }

        evaluator.eval(input)
        expect(envsService.addEnv).toHaveBeenCalledWith('name','let',10)
    })


    test('run Redefine test',()=>{



        const input = {
            type: 'Redefine',
            name: 'name',
            t: 'let',
            value: { type: 'Number', value: 5 }
        }

        evaluator.eval(input)
        expect(envsService.addEnv).toHaveBeenCalledWith('name','let',5)
    })

    test('run Print test',()=>{



        const input = {
            type: 'Print',
            expression: {type:'Number',value:10},
        }


        evaluator.eval(input)
        expect(logSpy).toHaveBeenCalledWith(10)
    })


})