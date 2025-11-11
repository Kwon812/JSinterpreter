import OutputView from "./OutputView.js";

class Queue {

    #queue

    constructor(queue) {
        this.#queue = queue;
    }

    front() {
        return this.#queue[0]
    }

    isEmpty() {
        return this.#queue.length === 0 || this.#queue[0].length === 0
    }

    enScope() {
        this.#queue.push([])
    }

    deScope() {
        this.#queue.shift()
    }

// [[],[],[] ]
    enqueue(data) {
        this.#queue[this.#queue.length - 1].push(data)
    }

    dequeue() {
        return this.#queue[0].shift()
    }

    get() {
        console.log(this.#queue)
    }
}

class Stack {

    #stack

    constructor(stack) {
        this.#stack = stack;
    }



    isEmpty() {
        return this.#stack.length === 0
    }



    push(data) {
        this.#stack.push(data);
    }

    pop() {
        return this.#stack.pop()
    }

}


class MicroTaskQueue extends Queue {

    constructor(queue) {
        super(queue);

    }
}

class TaskQueue extends Queue {
    constructor(queue) {
        super(queue);
    }
}

class CallStack extends Stack {

    constructor(stack) {
        super(stack);
    }
}

//
// const microTaskQueue = new MicroTaskQueue([])
// const taskQueue = new TaskQueue([])
// const callStack = new CallStack([])


export class EventLoop {
    #callStack
    #microTaskQueue
    #taskQueue
    arr=[]
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


    start() {
        const startTime = Date.now()
        const tick = () => {
            if(Date.now() - startTime > 500) {
                return
            }
            this.run()
            setTimeout(tick, 0)
        }
        tick()
    }

    run() {

        if(!this.#callStack.isEmpty()){
            const {env,callback}=this.#callStack.pop()
            console.log(env)
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

}