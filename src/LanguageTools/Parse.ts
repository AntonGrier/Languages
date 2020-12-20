import WAE from "./WAE"

type Sexp = {
    token: string;
} & ({
        value: null;
        args: Sexp[];
    } | {
        value: string;
        args: null;
    });

// (num 5)                  -> {token: "num", val: 5}
// (add (num 5) (num 10))   -> {token: add, args: [{num 5} {num 10}]}

let getExpr: String = (input: String) => {
    let expression: string = "";
    let i: number = 0;
    let foundOpening: boolean = false;
    let foundClosing: boolean = false;

}

let parseSexp: Sexp = (input: string) => {
    let i: number = 0;

    let token: string;
    let value: any;
    let args: Sexp[];

    while (i < input.length) {
        if (input[i] == "(") {
            foundOpening = true;
            i++;
            break;
        }
        i++;
    }

    while (i < input.length) {

    }

    return null;
}