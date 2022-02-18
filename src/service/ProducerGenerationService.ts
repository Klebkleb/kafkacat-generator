import { Service } from "typedi";
import { GenerationResult } from "../model/GenerationResult";
import type { ProducerCommandParameters } from "../model/ProducerCommandParameters";
import { GenerationService } from "./GenerationService";

@Service()
export class ProducerGenerationService extends GenerationService {

    createCommandString(commandParameters: ProducerCommandParameters): GenerationResult {
        let result = new GenerationResult();
		try {
			let msg: string;
			if(commandParameters.isJsonMessage) {
				let json = JSON.parse(commandParameters.message);
				msg = JSON.stringify(json);
			} else {
				msg = commandParameters.message;
			}
			result.message = `echo '${msg}' | kafkacat -b ${commandParameters.ip}:${
				commandParameters.port
			} -t ${commandParameters.topic} ${
				commandParameters.header ? "-H type=" + commandParameters.header : ""
			} -c 1 -P`;
			result.success = true;
		} catch (e) {
			console.log(e);
			result.message = e.message;
			result.success = false;
		}
		return result;
    }
}