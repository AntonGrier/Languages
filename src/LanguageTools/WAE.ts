import Env from "./Env";
import { EnvValue, numV, funV } from "./Env"; 

abstract class WAE {
    public abstract interpret(env: Env): EnvValue;
}

// temporary until type-system
let combineNumbers = (v1: EnvValue, v2: EnvValue, combineFunc: (n1: number, n2: number) => number) => {
    if (v1 !instanceof numV || v2 !instanceof numV) throw new Error(`At least one of ${v1} or ${v2} is not a number type`);
    let n1: number = (v1 as numV).getVal();
    let n2: number = (v2 as numV).getVal();
    let value: number = combineFunc(n1, n2);
    return new numV(value);
}

// temporary until type-system
let addValue = (v1: EnvValue, v2: EnvValue) => {
    let func = (n1: number, n2: number) => {return n1 + n2};
    return combineNumbers(v1, v2, func);
}

// temporary until type-system
let subValue = (v1: EnvValue, v2: EnvValue) => {
    let func = (n1: number, n2: number) => {return n1 - n2};
    return combineNumbers(v1, v2, func);
}

class num extends WAE {
    value: number;
    constructor(value: number) {
        super();
        this.value = value;
    }
    
    interpret(_env: Env): EnvValue {
        return new numV(this.value);
    }
}

class add extends WAE {
    lhs: WAE;
    rhs: WAE;
    constructor(lhs: WAE, rhs: WAE) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
    }

    interpret(env: Env): EnvValue {
        let combinedValue: EnvValue = addValue(this.lhs.interpret(env), this.rhs.interpret(env));
        return combinedValue;
    }
}

class sub extends WAE {
    lhs: WAE;
    rhs: WAE;
    constructor(lhs: WAE, rhs: WAE) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
    }

    interpret(env: Env): EnvValue {
        let combinedValue: EnvValue = subValue(this.lhs.interpret(env), this.rhs.interpret(env));
        return combinedValue;
    }
}

class With extends WAE {
    id: string;
    named : WAE;
    body: WAE;
    constructor(id: string, named: WAE, body: WAE) {
        super();
        this.id = id;
        this.named = named;
        this.body = body;
    }

    interpret(env: Env): EnvValue {
        let interpNamed = this.named.interpret(env);
        let newEnv: Env = env.extend(this.id, interpNamed);
        return this.body.interpret(newEnv);
    }
}

class id extends WAE {
    id: string;
    constructor(id: string) {
        super();
        this.id = id;
    } 

    interpret(env: Env): EnvValue {
        let envVal: EnvValue = env.lookup(this.id);
        return envVal;
    }
}

export default WAE;
export {num, add, sub, With, id}