import { num, add, sub, With, id } from "./WAE";
import WAE from "./WAE"
import { assert } from "console";

var parse = require('s-expression');
// type Sexp = {
//     token: string;
// } & ({
//         value: null;
//         args: Sexp[];
//     } | {
//         value: string;
//         args: null;
//     });

// (num 5)                  -> {token: "num", val: 5}
// (add (num 5) (num 10))   -> {token: add, args: [{num 5} {num 10}]}

// let getExpr: String = (input: String) => {
//     let expression: string = "";
//     let i: number = 0;
//     let foundOpening: boolean = false;
//     let foundClosing: boolean = false;
// }

const WAESymbols: string[] = ["+", "-", "with"]

let validWaeSymbol= (sexp: string) => {
    return sexp !== "+" && sexp !== "-" && sexp !== "with"
}

let validInt = (int: number): boolean => {
    return int !== NaN;
}

let sexpToWAE = (sexp: any): WAE => {
    let int: number = parseInt(sexp);
    if (validInt(int)) return new num(int);
    if (typeof sexp === "string" && validWaeSymbol(sexp)) return new id(sexp);
    assert(Array.isArray(sexp));

    let token: string = sexp[0];
    switch (token) {
        case "+":
            assert(sexp.length === 3);

            var sexpLhs: WAE = sexpToWAE(sexp[1]);
            var sexpRhs: WAE = sexpToWAE(sexp[2]);
            return new add(sexpLhs, sexpRhs);
        case "-":
            assert(sexp.length === 3);

            var sexpLhs: WAE = sexpToWAE(sexp[1]);
            var sexpRhs: WAE = sexpToWAE(sexp[2]);
            return new sub(sexpLhs, sexpRhs);
        case "with":
            assert(sexp.length === 3);
            let named: any = sexp[1];
            let body: any = sexp[2];

            assert(Array.isArray(named));
            assert(named.length === 2);
            let symbol: any = named[0];
            assert(typeof symbol === "string");
            assert(validWaeSymbol(symbol));
            let symbolBinding: WAE = sexpToWAE(named[1]);

            let bodyWAE: WAE = sexpToWAE(body);
            return new With(symbol, symbolBinding, bodyWAE);
        default:
            throw new Error("S-expression does not represent a WAE");
    }
}

let parseWAE = (input: string): WAE => {
    let sexp: any;
    try {
        sexp = parse(input);
    } catch (e) {
        console.error(e);
        throw new Error("Invalid s-expression");
    }
    return sexpToWAE(sexp);
}