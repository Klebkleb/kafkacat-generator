export class CommandParameters {
    useIp: boolean = true;
    ip: string = "";
    port: number = 9092
    topic: string = "";
    customArgs: CustomArg[] = [];
}

export class CustomArg {
    enabled: boolean = true;
    value: string = ""
}