import * as ls from "local-storage";
import type { ConsumerCommandParameters } from "../model/ConsumerCommandParameters";
import type { ProducerCommandParameters } from "../model/ProducerCommandParameters";
import { Observable, Subscriber } from 'rxjs';
import { Service } from "typedi";

class BaseStorageService<T> {
    static readonly LIST_KEY = "LIST"
    prefix: String;
    maxSize: number;
    private listObserver: Subscriber<string[]>;
    private listObservable: Observable<string[]>;
    private loadObserver: Subscriber<T>;
    private loadObservable: Observable<T>;

    constructor(prefix: String, maxSize = -1) {
        this.prefix = prefix;
        this.maxSize = maxSize
        this.listObservable = new Observable(observer => this.listObserver = observer)
        this.loadObservable = new Observable(observer => this.loadObserver = observer)
    }

    loadKeys(): string[] {
        let list = ls.get<string[]>(this.listName())
        if(!list) list = []
        return list
    }

    loadItem(name: string, broadCast = true): T {
        let item = ls.get<T>(this.keyFromName(name))
        if(this.loadObserver && broadCast)
            this.loadObserver.next(item);
        return item;
    }

    saveItem(name: string, item: T) {
        let key = this.keyFromName(name)
        ls.set<T>(key, item)
        let newKeys = this.loadKeys()
        newKeys.unshift(name)
        if(this.maxSize > -1) {
            newKeys = this.cleanExtraItems(newKeys)
        }
        ls.set<string[]>(this.listName(), newKeys)
        this.listObserver.next(newKeys)
    }

    deleteItem(name: string) {
        let keys = this.loadKeys()
        let newKeys = this.deleteFromStorage(keys, name)
        ls.set<string[]>(this.listName(), newKeys)
        this.listObserver.next(newKeys)
    }

    updateItem(name: string, newName: string, item: T) {
        let key = this.keyFromName(name)
        let keys = this.loadKeys()
        let idx = keys.indexOf(name)
        if(idx > -1) {
            keys.splice(idx, 1, newName)
        }
        ls.remove(key)
        ls.set<T>(this.keyFromName(newName), item)
        ls.set<string[]>(this.listName(), keys)
        this.listObserver.next(keys)
    }

    onListChange(): Observable<string[]> {
        return this.listObservable
    }

    onLoad(): Observable<T> {
        return this.loadObservable
    }

    private cleanExtraItems(keys: string[]): string[] {
        if(keys.length > this.maxSize) {
            let modifiedKeys = Object.assign([], keys)
            for(let i = this.maxSize; i < keys.length; i++) {
                modifiedKeys = this.deleteFromStorage(modifiedKeys, keys[i])
            }
            keys = modifiedKeys
        }
        return keys;
    }

    private deleteFromStorage(keys: string[], name: string): string[] {
        let key = this.keyFromName(name)
        ls.remove(key)
        let newKeys = this.removeFromArray(keys, name)
        return newKeys
    }

    private keyFromName(name: string) {
        return `${this.prefix}_${name}`
    }

    private listName() {
        return `${this.prefix}_${BaseStorageService.LIST_KEY}`
    }

    private removeFromArray(array: string[], key: string): string[] {
        let idx = array.indexOf(key)
        if(idx === 0) {
            array.shift()
        } else {
            array.splice(idx, 1)
        }
        return array
    }
}

@Service()
export class EnvironmentStorageService {
    private ipStorage: BaseStorageService<string>
    private topicStorage: BaseStorageService<string>
    private produceCommandStorage: BaseStorageService<ProducerCommandParameters>
    private consumeCommandStorage: BaseStorageService<ConsumerCommandParameters>

    constructor() {
        this.ipStorage = new BaseStorageService<string>("IP")
        this.topicStorage = new BaseStorageService<string>("TOPIC")
        this.produceCommandStorage = new BaseStorageService<ProducerCommandParameters>("PRODUCE_COMMAND", 5)
        this.consumeCommandStorage = new BaseStorageService<ConsumerCommandParameters>("CONSUME_COMMAND", 5)
    }

    getIPStorage() {
        return this.ipStorage;
    }

    getTopicStorage() {
        return this.topicStorage;
    }

    getProduceCommandStorage() {
        return this.produceCommandStorage;
    }

    getConsumeCommandStorage() {
        return this.consumeCommandStorage;
    }
}