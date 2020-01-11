const priorityCalculator = (queue) => queue.sort(
  (action, nextAction) => action.payload.priorityIndex || 0 - nextAction.payload.priorityIndex || 0
)

export default class Buffer {
  constructor() {
    this.queue = []
    this.length = 0
  }

  isEmpty() {
    return this.queue.length === 0
  }

  put(message) {
    this.queue.push(message)
    this.length = this.queue.length
  }

  take() {
    this.queue = priorityCalculator(this.queue)
    const msg = this.queue.shift()
    this.length = this.queue.length

    return msg
  }
}
