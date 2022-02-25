export class SideBarUpdateEvent {
    
    constructor(name: string, updatedName: string, value: string) {
        this.name = name;
        this.updatedName = updatedName;
        this.value = value;
    }

    name: string;
    updatedName: string;
    value: string;
}