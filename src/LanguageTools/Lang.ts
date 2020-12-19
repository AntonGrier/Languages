import { EnvValue } from "./Env";

abstract class Lang {
    public abstract interpret(): EnvValue;
}