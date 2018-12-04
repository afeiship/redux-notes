# listeners call
> 两种写法的区别

## 关于执行函数 this 的内存泄露问题
> 是因为直接listeners[i]()会把listeners作为this泄漏，而赋值为listener()后this指向全局变量
```js
// 这里的 () 执行的 this 指向 listenrs， 这里的 listeners 无法释放
for (let i = 0; i < listeners.length; i++) {
  listeners[i]()
}


// 下面这个 listener this 指向 global， 则不会有这个问题
for (let i = 0; i < listeners.length; i++) {
  const listener = listeners[i]
  listener()
}
```

## 关于 length 的缓存问题：
> 这里没有缓存listeners.length，Dan相信V8足够智能会自动缓存，相比手工缓存性能更好
> 这个和在v8里为什么不用 [].join 来拼接字符串一样的道理
```js
// 为什么不用这一段代码：
for (let i = 0, length = listeners.length; i < length; i++) {
  const listener = listeners[i]
  listener()
}
```


## 关于 for/forEach
> 这里使用for而不是forEach，是因为listeners是我们自己创造的，不存在稀疏组的情况，所有直接用for性能来得更好



## 理解JS里的稀疏数组与密集数组
+ https://www.cnblogs.com/goloving/p/8686780.html

### 稀疏数组
1. 什么是稀疏呢？稀疏也就是说，数组中的元素之间可以有空隙，因为一个数组其实就是一个键值映射。本文解释了如何创建稀疏数组和不稀疏的数组。

- 创建一个指定长度的稀疏数组很简单：
- 当你遍历它时，你会发现，它并没有元素，JavaScript会跳过这些缝隙。
- 还有一些其他情况会生成稀疏数组，比如：，数组元素实际只有2个，但是长度确实101。
```js
var ary = Array(3)
ary[0] = 1;
ary[100] = 100;
```

### 密集数组
> 创建密集数组的技巧：var a = Array.apply(null, Array(3));

实际上，JavaScript并没有常规的数组，所有的数组其实就是个对象，只不过会自动管理一些"数字"属性和length属性罢了。
说的更直接一点，`JavaScript中的数组根本没有索引，因为索引应该是数字，而JavaScript中数组的索引其实是字符串`：arr[1]其实就是arr["1"]，给arr["1000"] = 1，arr.length也会自动变为1001。
这些表现的根本原因就是：JavaScript中的对象就是字符串到任意值的键值对。注意键只能是字符串。这和AWK类似，不信可以试试awk 'BEGIN{a[1]=1;print(a["1"])}'。也许这是因为Brendan Eich在发明JavaScript时参考了不少awk的设计的原因。
不过目前，ES6中已经有了类似于Java等语言的 Map 类型，键可以是任意类型的值。

```js
Array.apply(null, Array(3)).map(Function.prototype.call.bind(Number))
//[ 0, 1, 2 ]
```


## 自己做的一个测试：
<img width="500" src="https://ws4.sinaimg.cn/large/006tNbRwly1fxumwzugvrj30xo0u0dku.jpg"/>

```js
// 稀疏数组
var ary1 = Array(3)
ary1[0] = 1;
ary1[10] = 10;

// 这种会循环11次
for(var i=0; i<ary1.length; i++){
  console.log('for :',i)
}

// 这种中会log2次
ary1.forEach((item,i)=>{
  console.log('each:',i)
})
```

~~~
结论(conclusion)：
1. 如果是 稀疏数组，forEach 应该会内部优化，只会循环较少的次数
2. 如果是 秘籍数组， for 循环因为内部逻辑相对简单，所以，性能会较好
~~~
