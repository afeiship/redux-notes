# beforeMutatingListeners
+ https://github.com/reduxjs/redux/commit/c031c0a8d900e0e95a4915ecc0f96c6fe2d6e92b

## 又是一处性能优化：
Delay copying listeners until is necessary
We can avoid `excessive(过多的; 过分的; 过度的，极度的; 过逾;) slice()` calls by `only copying the listeners if they are modified` during dispatch()
