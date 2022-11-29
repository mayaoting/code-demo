const PENDING = 'pending';
const REJECTED = 'rejected';
const RESOLVE = 'resolved';

function MyPromise(fn) {
    var self = this;
    this.state = PENDING;
    this.value = null;
    this.resolveCallbacks = [];
    this.rejectedCallbacks = [];

    function resolve(value) {
        if(value instanceof MyPromise) {
            return value.then(resolve, reject);
        }

        setTimeout(() => {
            if(self.state === PENDING) {
                self.state = RESOLVE;
                self.value = value;
                self.resolveCallbacks.forEach(callback => {
                    callback(value)
                });;
            }
        }, 0);
    };
    function reject() {
        setTimeout(() => {
            if (self.state === PENDING) {
                self.state = REJECTED;
                self.value = value;
                self.rejectedCallbacks.forEach(callback => {
                    callback(value)
                });;
            }
        }, 0);
    }
    try {
        fn(resolve, reject)
    } catch (error) {
        reject(e)
    }
}

MyPromise.prototype.then = function(onResolved, onRejected){
    onResolved = typeof onResolved === 'function' ? onResolved : function (value) {return value};
    onRejected = typeof onRejected === 'function' ? onRejected : function (error) {throw error};
    if (this.state === PENDING) {
        this.resolveCallbacks.push(onResolved);
        this.rejectedCallbacks.push(onRejected);
    }
    if (this.state === RESOLVE) {
        onResolved(this.value);
    }
    if (this.state === REJECTED) {
        onRejected(this.value);
    }
}

function getData(data) {
    return new MyPromise((resolve, reject)=> {
        setTimeout(() => {
            resolve(data)
            // reject(data)
            // throw new Error('err')
        }, 1000);
    })
}

getData(1).then((res) => {
    console.log(res, 'success')
},(err) => {
    console.log(err, 'reject')
})