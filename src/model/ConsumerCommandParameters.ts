import { CommandParameters } from "./CommandParameters";

export class ConsumerCommandParameters extends CommandParameters {
    searchTerm: string = "";
    formatResponse = true;
	showHeader = true;
	showTimestamp = true;
	useJq = false;
	customFormat = "";
	messageCount = 100;
}