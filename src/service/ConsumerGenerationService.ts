import { Service } from "typedi";
import type { ConsumerCommandParameters } from "../model/ConsumerCommandParameters";
import { GenerationResult } from "../model/GenerationResult";
import { GenerationService } from "./GenerationService";

@Service()
export class ConsumerGenerationService extends GenerationService {


    createCommandString(commandParameters: ConsumerCommandParameters): GenerationResult {
        let result = new GenerationResult();
		try {
			let searchCommand = "";
			if (commandParameters.searchTerm) {
				searchCommand = ` | grep -B 1 -A 1 "${commandParameters.searchTerm}"`;
			}
			let format = this.createFormatString(commandParameters);
			let customCommands = this.createCustomParametersString(commandParameters)
			let ip = this.createIPString(commandParameters)
			result.message = `kafkacat -C ${ip} ${customCommands}-t ${commandParameters.topic} -p 0 -o -${commandParameters.messageCount} -e ${format}${searchCommand}`;
			result.success = true;
		} catch (e) {
			console.log(e);
			result.message = e.message;
			result.success = false;
		}
		return result;
    }

    createFormatString(commandParameters: ConsumerCommandParameters): string {
		if (commandParameters.formatResponse && !commandParameters.customFormat) {
			return `-f "${commandParameters.showTimestamp ? "\\nTimestamp: %T" : ""}${
				commandParameters.showHeader ? "\\nHeader: %h" : ""
			}\\n%s\\n"`;
		} else if (commandParameters.formatResponse && commandParameters.customFormat) {
			return `-f "${commandParameters.customFormat}"`;
		} else {
			return "";
		}
	}
}