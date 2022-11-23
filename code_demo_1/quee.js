const MAX_CONCURRENTLY_EXECUTING = 2;
const MAX_QUEUE_SIZE = 5;
const LIFO = 'LIFO';
const FIFO = 'FIFO';

class QueueProcessingCallback {
  size = 0
  tasks = []
  type = FIFO

  constructor(queueProcessingOrder) {
    this.type = queueProcessingOrder
  }

  eachCallback (arr) {
    const self = this
    return arr.reduce((p, n) => {
      return p.then(() => {
        return n().then(() => {
          self.size--
        })
      })
    }, Promise.resolve())
  }

  process (callbackFns) {
    this.size++
    if (this.size <= MAX_QUEUE_SIZE) {
      this.tasks.push(callbackFns)
      this.next()
    } else {
      this.tasks = []
      this.size = 0
    }
  }


  next () {
    const { tasks } = this
    const arr = tasks.splice(0, MAX_CONCURRENTLY_EXECUTING)

    if (arr.length <= MAX_QUEUE_SIZE) {
      if (this.type === FIFO) {
        const t = arr.pop()
        this.eachCallback(arr.concat(tasks))
        if (t) t()
      } else {
        const t = arr.shift()
        this.eachCallback(arr.concat(tasks.reverse()))
        if (t) t()

      }
    }
  }
}



const qpc = new QueueProcessingCallback();
const qpcLifo = new QueueProcessingCallback('LIFO');

// no callbacks in the queue; callback1 and callback2 should be executed immediately
// qpc.process(callback1);
// qpc.process(callback2);
// logs '1' after 100ms, logs '2' after 150ms

// // significantly later ...
// // callback1 and callback2 are executed immediately; callback3 and callback4 land in the queue
// qpc.process(callback1);
// qpc.process(callback2);
// qpc.process(callback3);
// qpc.process(callback4);
// // logs '1' after 100ms, logs '2' after 150ms, logs '3' after 300ms, logs '4' after 400ms

// // significantly later ...
// // callback1 and callback2 are executed immediately; callback3 and callback4 land in the queue
// qpcLifo.process(callback1);
// qpcLifo.process(callback2);
// qpcLifo.process(callback3);
// qpcLifo.process(callback4);
// // logs '1' after 100ms, logs '2' after 150ms, logs '4' after 350ms, logs '3' after 350ms

// // significantly later ...
// // when there are already five callbacks in the queue, the next incoming callbacks should be discarded
qpc.process(callback1);
qpc.process(callback1);
qpc.process(callback1);
qpc.process(callback1);
qpc.process(callback1);
qpc.process(callback1);
qpc.process(callback1);
qpc.process(callback1);
qpc.process(callback1);
qpc.process(callback1);
// // '1' is logged only seven times
