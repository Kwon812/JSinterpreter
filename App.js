import OutputView from "./OutputView.js";
import Keywords from "./keyword/Keywords.js";
import Keyword from "./keyword/Keyword.js";
import fs from "node:fs";
import Token from "./ast/Token.js";
import AstParser from "./ast/AstParser.js";
import EnvsController from "./run/EnvsController.js";
import Run from "./run/Run.js";


export default class App{

    constructor() {
        this.outputView = new OutputView();
        this.keywords = new Keywords(
            [new Keyword('Variable', 'let'),
                new Keyword('Variable', 'const'),
                new Keyword('Print', 'print'),
                new Keyword('If', 'if'),
                new Keyword('Fun', 'func'),
                new Keyword('From', 'from'),
                new Keyword('For', 'while')
            ]
        )
    }


    run(){


        const parsed = fs.readFileSync('./main', 'utf-8');
        const main = parsed.trim()

        this.outputView.printSystemMessage('start')

        const tokens = Token.tokenize(main)
        const parsedAst = new AstParser(tokens, this.keywords).parse()
        const envsController = new EnvsController()
        new Run(envsController).run(parsedAst)

        this.outputView.printSystemMessage('end')

    }
}