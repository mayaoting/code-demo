type IEmiter = {
    fn: Function
    once?: boolean
}

class EventEmitter {
    cache: Record<string, IEmiter[]> = {};

    constructor() {
        this.cache = {}
    }

    on(key, fn, once) {
        if(this.cache[key].length) {
            this.cache[key].push({fn, once})
        } else {
            this.cache[key] = [{fn, once}]
        }
    }

    once(key, fn) {
        this.on(key, fn, true)
    }

    emit(key, ...arg) {
        if(this.cache[key].length) {
            this.cache[key] = this.cache[key].filter(item => {
                item.fn(arg);
                return !item.once;
            })
        }
    }

    off(key, fn) {
        this.cache[key] = this.cache[key].filter(item => {
           return item.fn !== fn
        })
    }
}