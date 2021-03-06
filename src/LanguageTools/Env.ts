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
    id: string;
    body: WAE;
    envCall: Env;
    constructor(id: string, body: WAE, envCall: Env) {
        super();
        this.id = id;
        this.body = body;
        this.envCall = envCall;
    }
}

interface SymbolValueMapping {
    sym: string;
    val: EnvValue;
}

class Env {
    mappings: SymbolValueMapping[];
    constructor(mappings?: SymbolValueMapping[]) {
        this.mappings = mappings ? mappings : [];
    }

    public extend(x: string, val: EnvValue): Env {
        let newMappings: SymbolValueMapping[] = this.mappings;
        newMappings.push({sym: x, val: val});
        return new Env(newMappings);
    }

    public lookup(x: string): EnvValue {
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