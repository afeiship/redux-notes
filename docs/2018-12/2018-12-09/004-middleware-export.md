# middleware export:

## 这句代码的理解：
```js
return {
      ...store,
      dispatch
    };
```

## 化简：
```js
var obj = {
  name: 'redux',
  friend: 'react'
};

var rs1 = Object.assign({},obj, {
  name: 'ZF'
});

var rs2 = {
  ...obj,
  name: 'ZF'
};

```
![](https://ws2.sinaimg.cn/large/006tNbRwgy1fy0nqez9i0j30je0fiq42.jpg)
