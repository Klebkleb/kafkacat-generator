import { createEventDispatcher } from "svelte";
import Container from "typedi";
import type { CommandParameters } from "../model/CommandParameters";
import type { GenerationResult } from "../model/GenerationResult";
import { EnvironmentStorageService } from "./EnvironmentStorageService";

export abstract class GenerationService {
	dispatcher = createEventDispatcher();
    environmentStorage = Container.get(EnvironmentStorageService)

    abstract createCommandString(commandParameters: CommandParameters): GenerationResult

    public generate(commandParameters: CommandParameters) {
        this.dispatch(this.createCommandString(commandParameters))
    }

    protected dispatch(result: GenerationResult) {
        this.dispatcher('commandGenerated', result)
    } 
}