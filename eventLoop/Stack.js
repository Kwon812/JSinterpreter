export default class Stack {

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

