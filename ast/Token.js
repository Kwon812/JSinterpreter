

export default class Token {



    static tokenize(str) {
        const regex = /[A-Za-z]+|[0-9]+|[=+]|"[^"].*"|\(.*\)|\S/g
        const match = str?.match(regex)
        if (!match) throw 'syntax Error'
        return match
    }
}