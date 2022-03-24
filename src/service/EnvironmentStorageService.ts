import * as ls from "local-storage";
import type { ConsumerCommandParameters } from "../model/ConsumerCommandParameters";
import type { ProducerCommandParameters } from "../model/ProducerCommandParameters";
import { Observable, Subscriber } from 'rxjs';
import { Service } from "typedi";

class BaseStorageService<T> {
    static readonly LIST_KEY = "LIST"
    prefix: String;
    private listObserver: Subscriber<string[]>;
    private listObservable: Observable<string[]>;
    private loadObserver: Subscriber<T>;
    private loadObservable: Observable<T>;

    constructor(prefix: String) {
        this.prefix = prefix;
        this.listObservable = new Observable(observer => this.listObserver = observer)
        this.loadObservable = new Observable(observer => this.loadObserver = observer)
    }

    loadKeys(): string[] {
        let list = ls.get<string[]>(this.listName())
        if(!list) list = []
        return list
    }

    loadItem(name: string): T {
        let item = ls.get<T>(this.keyFromName(name))
        if(this.loadObserver)
            this.loadObserver.next(item);
        return item;
    }

    saveItem(name: string, item: T) {
        let key = this.keyFromName(name)
        ls.set<T>(key, item)
        let newKeys = this.loadKeys().concat(name)
        ls.set<string[]>(this.listName(), newKeys)
        this.listObserver.next(newKeys)
    }

    deleteItem(name: string) {
        let key = this.keyFromName(name)
        ls.remove(key)
        let newKeys = this.removeFromArray(this.loadKeys(), name)
        ls.set<string[]>(this.listName(), newKeys)
        this.listObserver.next(newKeys)
    }

    updateItem(name: string, newName: string, item: T) {
        this.deleteItem(name);
        this.saveItem(newName, item);
    }

    onListChange(): Observable<string[]> {
        return this.listObservable
    }

    onLoad(): Observable<T> {
        return this.loadObservable
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
    private ipStorage: BaseStorageService<string>
    private topicStorage: BaseStorageService<string>
    private produceCommandStorage: BaseStorageService<ProducerCommandParameters>
    private consumeCommandStorage: BaseStorageService<ConsumerCommandParameters>

    constructor() {
        this.ipStorage = new BaseStorageService<string>("IP")
        this.topicStorage = new BaseStorageService<string>("TOPIC")
        this.produceCommandStorage = new BaseStorageService<ProducerCommandParameters>("PRODUCE_COMMAND")
        this.consumeCommandStorage = new BaseStorageService<ConsumerCommandParameters>("CONSUME_COMMAND")
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