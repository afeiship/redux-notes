# es6-spread:
> 关于 es6 的解构语法

```js
function abc(inOptions={}){
    const { pure = true, withRef = false } = inOptions;
    console.log(pure,withRef)
}
abc();
// true/false

abc({ pure: false, withRef: 'tes'});
// false/'tes'
```


## es5 大概就是这样：
```js
var _options$pure = options.pure,
    pure = _options$pure === undefined ? true : _options$pure,
    _options$withRef = options.withRef,
    withRef = _options$withRef === undefined ? false : _options$withRef;
```
