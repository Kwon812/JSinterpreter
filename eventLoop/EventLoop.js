import CallStack from "./CallStack.js";
import MicroTaskQueue from "./MicroTaskQueue.js";
import TaskQueue from "./TaskQueue.js";

export default  class EventLoop {
    #callStack
    #microTaskQueue
    #taskQueue
    constructor(callStack, microTaskQueue, taskQueue) {
        this.#callStack = new CallStack([])
        this.#microTaskQueue = new MicroTaskQueue([[]])
        this.#taskQueue = new TaskQueue([[]])

    }



    init(i, frame,name) {

        switch (i) {
            case 'call':
                this.#callStack.push(frame)
                break;
            case 'micro':
                this.#microTaskQueue.enqueue(frame)
                break;
            case 'task':
                this.#taskQueue.enqueue(frame)
                break;
        }
    }


    run() {

        if(!this.#callStack.isEmpty()){
            const {env,callback}=this.#callStack.pop()
            env.pushEnvsScope()
            callback()
            env.popEnvsScope()
            return
        }
        if(!this.#microTaskQueue.isEmpty()){
            const {env,callback}= this.#microTaskQueue.dequeue();
            env.pushEnvsScope()
            callback()
            env.popEnvsScope()
            return
        }


        if (!this.#taskQueue.isEmpty()) {
            const {env,callback}= this.#taskQueue.dequeue();
            env.pushEnvsScope()
            callback()
            env.popEnvsScope()
        }
    }


    start() {

        const startTime = Date.now()
        const tick = () => {

            if(Date.now() - startTime > 3000) {
                return
            }

            this.run()
            setTimeout(tick, 0)
        }
        tick()
    }

}