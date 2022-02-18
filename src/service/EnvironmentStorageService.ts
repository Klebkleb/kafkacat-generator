import * as ls from "local-storage";
import type { CommandParameters } from "../model/CommandParameters";
import type { ConsumerCommandParameters } from "../model/ConsumerCommandParameters";
import type { ProducerCommandParameters } from "../model/ProducerCommandParameters";
import { Observable, Subscriber } from 'rxjs';
import { Service } from "typedi";

class BaseStorageService<T> {
    static readonly LIST_KEY = "LIST"
    prefix: String;
    observer: Subscriber<string[]>;
    private listObservable: Observable<string[]>;

    constructor(prefix: String) {
        this.prefix = prefix;
        this.listObservable = new Observable(observer => this.observer = observer)
    }

    loadKeys(): string[] {
        let list = ls.get<string[]>(this.listName())
        if(!list) list = []
        return list
    }

    loadItem(name: string): T {
        return ls.get<T>(this.keyFromName(name))
    }

    saveItem(name: string, item: T) {
        let key = this.keyFromName(name)
        ls.set<T>(key, item)
        let newKeys = this.loadKeys().concat(name)
        ls.set<string[]>(this.listName(), newKeys)
        this.observer.next(newKeys)
    }

    deleteItem(name: string) {
        let key = this.keyFromName(name)
        ls.remove(key)
        let newKeys = this.removeFromArray(this.loadKeys(), name)
        ls.set<string[]>(this.listName(), newKeys)
        this.observer.next(newKeys)
    }

    onListChange(): Observable<string[]> {
        return this.listObservable
    }

    private keyFromName(name: string) {
        return `${this.prefix}_${name}`
    }

    private listName() {
        return `${this.prefix}_${BaseStorageService.LIST_KEY}`
    }

    private removeFromArray(array: string[], key: string) {
        let idx = array.indexOf(key)
        if(idx == 0) {
            array.shift()
        } else {
            array.splice(idx)
        }
        return array;
    }
}

@Service()
export class EnvironmentStorageService {
    private environmentStorage: BaseStorageService<CommandParameters>
    private produceCommandStorage: BaseStorageService<ProducerCommandParameters>
    private consumeCommandStorage: BaseStorageService<ConsumerCommandParameters>

    constructor() {
        this.environmentStorage = new BaseStorageService<CommandParameters>("ENV")
        this.produceCommandStorage = new BaseStorageService<ProducerCommandParameters>("PRODUCE_COMMAND")
        this.consumeCommandStorage = new BaseStorageService<ConsumerCommandParameters>("CONSUME_COMMAND")
    }

    getEnvironmentStorage() {
        return this.environmentStorage;
    }

    getProduceCommandStorage() {
        return this.produceCommandStorage;
    }

    getConsumeCommandStorage() {
        return this.consumeCommandStorage;
    }
}