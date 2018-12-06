# compose 函数：
+ https://www.jianshu.com/p/c9dfe57c4a4e
+ https://zhuanlan.zhihu.com/p/20597452
+ https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch5.html

## 做什么的：
<img width="450" src="https://upload-images.jianshu.io/upload_images/1637794-c7c121acb4346d95.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp" />


## compose 1.0.0 里的源码：
```js
export default function compose(...funcs) {
  return funcs.reduceRight((composed, f) => f(composed));
}

// 改成 es5 的写法：
module.exports = function(){
  var funcs = [].slice.call(arguments);
  return funcs.reduceRight(function(composed, fn){
    return fn(composed);
  });
};
```

## compose 3.7.2 源码
```js
function compose (...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

function compose3(){
  var funcs = [].slice.call(arguments);
  if(funcs.length === 0){
    return function(inArgs){
      return inArgs
    }
  }

  if(funcs.length === 0){
    return funcs[0]
  }

  return funcs.reduceRight(function(a,b){
    return function(){
      var args = [].slice.call(arguments);
      return a(b.apply(null,args))
    }
  })
}
```


## 看一些简单的例子：
- 代码组合（compose）

```js
// 这就是 组合（compose，以下将称之为组合）：
var compose = function(f,g) {
  return function(x) {
    return f(g(x));
  };
};
```

## 解释上面的函数：
~~~
f 和 g 都是函数，x 是在它们之间通过“管道”传输的值。
组合看起来像是在饲养函数。你就是饲养员，选择两个有特点又遭你喜欢的函数，让它们结合，产下一个崭新的函数。组合的用法如下：
~~~

```js
var toUpperCase = function(x) { return x.toUpperCase(); };
var exclaim = function(x) { return x + '!'; };
var shout = compose(exclaim, toUpperCase);

shout("send in the clowns");
//=> "SEND IN THE CLOWNS!"
```

## 如果不用 compose 
```js
var shout = function(x){
  return exclaim(toUpperCase(x));
};
```



### 自己的完整的测试代码：
```js
var addAt = function(x){
  console.log('add @')
  return '@' + x
}

var toUpperCase = function(x) { 
    console.log('toUpperCase!!!')
    return x.toUpperCase(); 
};

var exclaim = function(x) { 
    console.log('exclaim!!')
    return x + '!'; 
};

var revers = function(x){
    console.log('reverse!!!')
    return x.split('').reverse().join('-');
}


function compose3(){
  var funcs = [].slice.call(arguments);
  if(funcs.length === 0){
    // 如果一个参数没有，那么就是 returnValue 
    return function(inArgs){
      return inArgs;
    }
  }

  if(funcs.length === 0){
    return funcs[0];
  }

  return funcs.reduce(function(a,b){
    return function(){
      var args = [].slice.call(arguments);
      // 因为 compose 的参数都是 pure function ，所以，apply 和 call 都对 context 没有要求
      return a(b.apply(null,args));
    }
  })
}

var shut2 = compose3(addAt,toUpperCase, exclaim, revers)

shut2('afeiship')
```
