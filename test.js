class Queue {

    #queue

    constructor(queue) {
        this.#queue = queue;
    }

    front() {
        return this.#queue[0]
    }

    isEmpty() {
        return this.#queue[0].length === 0 || this.#queue.length === 0
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


    peek() {
        return this.#stack[this.#stack.length - 1]
    }

    isEmpty() {
        return this.peek().length === 0
    }

    pushScope() {
        this.#stack.push([])
    }

    popScope() {
        this.#stack.pop()
    }

    push(data) {
        this.#stack[this.#stack.length - 1].push(data);
    }

    pop() {
        return this.#stack[this.#stack.length - 1].pop()
    }

    get() {
        console.log(this.#stack)
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

    constructor(callStack, microTaskQueue, taskQueue) {
        this.#callStack = new CallStack([[]])
        this.#microTaskQueue = new MicroTaskQueue([[]])
        this.#taskQueue = new TaskQueue([[]])

    }

    call(callback) {
        this.#callStack.push(callback)
        this.run()
    }

    pushScope(type) {
        if (type === 'micro') this.#microTaskQueue.enScope()
        if (type === 'task') this.#taskQueue.enScope()
        else this.#callStack.pushScope()

    }

    popScope(type) {
        if (type === 'micro') this.#microTaskQueue.deScope()
        if (type === 'task') this.#taskQueue.deScope()
        else this.#callStack.popScope()
    }

    getStack() {
        this.#callStack.get()
    }

    init([i, callbackBody]) {
        switch (i) {
            case 'call':
                this.#callStack.pushScope()
                this.#callStack.push(callbackBody)

                // this.#callStack.get()
                break;
            case 'micro':
                this.#microTaskQueue.enScope()
                this.#microTaskQueue.enqueue(callbackBody)

                break;
            case 'task':
                // this.#taskQueue.enScope()
                this.#taskQueue.enqueue(callbackBody)
                break;

        }
    }

    run() {
        this.#callStack.get()
        this.#microTaskQueue.get()
        while (!this.#callStack.isEmpty()) {

            const fn = this.#callStack.pop();

            fn();
        }
        this.#microTaskQueue.get()
        this.#callStack.popScope()
        this.#microTaskQueue.get()
        console.log(this.#microTaskQueue.isEmpty())
        while (!this.#microTaskQueue.isEmpty()) {
            const fn = this.#microTaskQueue.dequeue();
            console.log(fn)
            fn();
        }
        this.#microTaskQueue.deScope()
        while (!this.#taskQueue.isEmpty()) {
            const fn = this.#taskQueue.dequeue();
            fn();
        }

    }

}

//
// const event=new EventLoop(callStack,microTaskQueue,taskQueue)
// event.init(['C','첫번째'])
// event.init(['C','두번째'])
// event.init(['B','첫번째'])
// event.init(['B','두번째'])
// event.init(['A','첫번쨰'])
// event.init(['A','두번쨰'])
//
//
// event.run()