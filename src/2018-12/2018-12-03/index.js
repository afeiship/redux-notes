var Symbol_observable = require('symbol-observable').default;

console.log(Symbol_observable)
var someObject = {
  name: 'fei'
};

someObject[Symbol_observable] = () => {
  console.log('test')
  return {
    subscribe(observer) {
      const handler = e => observer.next(e);
      someObject.addEventListener('data', handler);
      return {
        unsubscribe() {
          console.log('un...');
          someObject.removeEventListener('data', handler);
        }
      }
    },
    [Symbol_observable]() { return this }
  }
}
