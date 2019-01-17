# invariant
> 这个是一个友好的报错 lib

## desc:
> A way to provide descriptive errors in development but generic errors in production.

## usage:
```js
var invariant = require('invariant');
invariant(someTruthyVal, 'This will not throw');
// No errors
invariant(someFalseyVal, 'This will throw an error with this message');
// Error: Invariant Violation: This will throw an error with this message
```
