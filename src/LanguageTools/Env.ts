import WAE from "./WAE"

abstract class EnvValue {
}

class numV extends EnvValue {
    value: number;
    constructor(value: number) {
        super();
        this.value = value;
    }

    public getVal(): number {
        return this.value;
    }
}

class funV extends EnvValue {
    id: Symbol;
    body: WAE;
    envCall: Env;
    constructor(id: Symbol, body: WAE, envCall: Env) {
        super();
        this.id = id;
        this.body = body;
        this.envCall = envCall;
    }
}

interface SymbolValueMapping {
    sym: Symbol;
    val: EnvValue;
}

class Env {
    mappings: SymbolValueMapping[];
    constructor(mappings?: SymbolValueMapping[]) {
        this.mappings = mappings ? mappings : [];
    }

    public extend(x: Symbol, val: EnvValue): Env {
        let newMappings: SymbolValueMapping[] = this.mappings;
        newMappings.push({sym: x, val: val});
        return new Env(newMappings);
    }

    public lookup(x: Symbol): EnvValue {
        for (let mapping of this.mappings) {
            if (mapping.sym === x) {
                return mapping.val;
            }
        }
        throw new Error(`Unbound identifier ${x}`);
    }
}

export default Env;
export { EnvValue, numV, funV };