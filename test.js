class Queue {

    #queue

    constructor(queue) {
        this.#queue = queue;
    }

    isEmpty() {
        return this.#queue.length === 0;
    }

    enqueue(data) {
        this.#queue.push(data)
    }

    dequeue() {
        return this.#queue.shift()
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
        return this.#stack.length === 0;
    }

    push(data) {
        this.#stack.push(data);
    }

    pop() {
        return this.#stack.pop()
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


const microTaskQueue = new MicroTaskQueue([])
const taskQueue = new TaskQueue([])
const callStack = new CallStack([])


export class EventLoop {
    #callStack
    #microTaskQueue
    #taskQueue

    constructor(callStack, microTaskQueue, taskQueue) {
        this.#microTaskQueue = new MicroTaskQueue([])
        this.#taskQueue = new TaskQueue([])
        this.#callStack = new CallStack([])
    }
    call(callback){
        this.#callStack.push(callback)
    }
    init([i, callbackBody]) {
        switch (i) {
            case 'call':
                this.#callStack.push(callbackBody)
                break;
            case 'micro':
                this.#microTaskQueue.enqueue(callbackBody)
                break;
            case 'task':
                this.#taskQueue.enqueue(callbackBody)
                break;

        }
    }

    run() {
            // setTimeout(()=>{},400)
            while (!this.#callStack.isEmpty()) {
                const fn = this.#callStack.pop();
                fn();
            }

            // 2️⃣ 그다음 마이크로태스크 실행
            while (!this.#microTaskQueue.isEmpty()) {
                const fn = this.#microTaskQueue.dequeue();
                fn();
            }

            // 3️⃣ 마지막으로 태스크 실행
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