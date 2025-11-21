import EventLoop from "../eventLoop/EventLoop.js";
import EnvsService from "../envs/EnvsService.js";


describe('EventLoop test', () => {


    let eventLoop;
    let env;
    let logSpy
    beforeEach(() => {
        eventLoop = new EventLoop()
        env = new EnvsService()
        logSpy = jest.spyOn(console, 'log')
    })
    afterEach(() => {
        logSpy.mockRestore()
    })


    test('init test', () => {

        const spy = jest.spyOn(eventLoop, 'init')
        eventLoop.init('call', 'mockCallback1')
        eventLoop.init('micro', 'mockCallback2')
        eventLoop.init('task', 'mockCallback3')
        expect(eventLoop.getState()).toEqual({
            callStack: ['mockCallback1'],
            microTaskQueue: ['mockCallback2'],
            taskQueue: ['mockCallback3']
        })
    })
    test('callStack run test',()=>{
        let callback=jest.fn(()=>{
            console.log('callStack running')
        })

        eventLoop.init('call', {env,callback})
        eventLoop.run()
        expect(callback).toHaveBeenCalled()
    })

    test('start tick test', () => {
        const mockRun=jest.fn()
        eventLoop.run = mockRun

        jest.useFakeTimers()

        let now = 0
        Date.now=jest.fn(() => 0)

        eventLoop.start()

        for (let i = 0; i < 1000; i += 1) {
            now += 1
        }

        expect(mockRun).toHaveBeenCalled()

    });
})