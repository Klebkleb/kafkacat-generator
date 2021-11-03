import { CommandParameters } from "./CommandParameters";

export class ProducerCommandParameters extends CommandParameters {
    isJsonMessage = true;
	message = "";
	header = "";
}