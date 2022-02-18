import { createEventDispatcher } from "svelte";
import Container from "typedi";
import type { CommandParameters } from "../model/CommandParameters";
import type { GenerationResult } from "../model/GenerationResult";
import { EnvironmentStorageService } from "./EnvironmentStorageService";

export abstract class GenerationService {
	dispatcher = createEventDispatcher();
    environmentStorage = Container.get(EnvironmentStorageService)

    abstract createCommandString(commandParameters: CommandParameters): GenerationResult
    abstract saveCommand(name: string, command: CommandParameters)
    
    public saveEnv(name: string, environment: CommandParameters) {
        this.environmentStorage.getEnvironmentStorage().saveItem(name, environment)
    }

    public generate(commandParameters: CommandParameters) {
        this.dispatch(this.createCommandString(commandParameters))
    }

    protected dispatch(result: GenerationResult) {
        this.dispatcher('commandGenerated', result)
    } 
}