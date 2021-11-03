import { createEventDispatcher } from "svelte";
import type { CommandParameters } from "../model/CommandParameters";
import type { GenerationResult } from "../model/GenerationResult";

export abstract class GenerationService {
	dispatcher = createEventDispatcher();

    abstract createCommandString(commandParameters: CommandParameters): GenerationResult

    public generate(commandParameters: CommandParameters) {
        this.dispatch(this.createCommandString(commandParameters))
    }

    protected dispatch(result: GenerationResult) {
        this.dispatcher('commandGenerated', result)
    } 
}