import Evaluator from "./Evaluator.js";

export default class Run extends Evaluator{


    constructor(envs,eventLoop) {
        super(eventLoop,envs)
    }



    run(ast) {

        ast.forEach(node => {
            this.eval(node)
        })
    }

    startEventLoop(){
        this.eventLoop.start()
    }


}