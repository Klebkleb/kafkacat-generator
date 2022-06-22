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

    protected createCustomParametersString(commandParameters: CommandParameters): string {
		let result = ""
		if(commandParameters.customArgs && commandParameters.customArgs.length > 0) {
			for(let i = 0; i < commandParameters.customArgs.length; i++) {
				if(commandParameters.customArgs[i].enabled) {
					result += commandParameters.customArgs[i].value + " "
				}
			}
		}
		return result
	}

    protected createIPString(commandParameters: CommandParameters): string {
        return  commandParameters.useIp ? `-b  ${commandParameters.ip}:${commandParameters.port}` : ""
    }
}