import { createEventDispatcher } from "svelte";
import Container from "typedi";
import type { CommandParameters } from "../model/CommandParameters";
import type { GenerationResult } from "../model/GenerationResult";
import { EnvironmentStorageService } from "./EnvironmentStorageService";

export abstract class GenerationService {
	dispatcher = createEventDispatcher();
    environmentStorage = Container.get(EnvironmentStorageService)

    abstract createCommandString(commandParameters: CommandParameters): GenerationResult

    public generate(commandParameters: CommandParameters): boolean {
        let result = this.createCommandString(commandParameters)
        this.dispatch(result)
        return result.success
    }

    protected dispatch(result: GenerationResult) {
        this.dispatcher('commandGenerated', result)
    } 
}