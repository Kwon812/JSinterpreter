export default class Queue {

    #queue

    constructor(queue) {
        this.#queue = queue;
    }

    isEmpty() {
        return this.#queue.length === 0 || this.#queue[0].length === 0
    }

    enqueue(data) {
        this.#queue[this.#queue.length - 1].push(data)
    }

    dequeue() {
        return this.#queue[0].shift()
    }

}
