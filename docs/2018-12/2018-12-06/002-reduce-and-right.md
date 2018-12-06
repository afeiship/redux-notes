# reduce && reduceRight:
+ https://www.w3cplus.com/javascript/array-part-8.html

## 区别：
~~~
reduceRight()方法的功能和reduce()功能是一样的，不同的是reduceRight()从数组的末尾向前将数组中的数组项做累加。
reduceRight()首次调用回调函数callbackfn时，prevValue 和 curValue 可以是两个值之一。如果调用 reduceRight() 时提供了 initialValue 参数，则 prevValue 等于 initialValue，curValue 等于数组中的最后一个值。如果没有提供 initialValue 参数，则 prevValue 等于数组最后一个值， curValue 等于数组中倒数第二个值。
~~~

## 自己实现一个 reduce 
> `reduce()` 方法接收一个函数 `callbackfn` 作为累加器 `（accumulator）` ，数组中的每个值（从左到右）开始合并，最终为一个值。著作权归作者所有。

```js
/*
  array.reduce(callbackfn,[initialValue])
  function callbackfn(preValue,curValue,index,array){}
*/

function reduce(inArray, inCallback, inInitialValue){
}
```




