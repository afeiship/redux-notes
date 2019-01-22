# children.only
> 根据下面的分析：这个代码的含义是，ReactElement.isValidElement(children) 是合法的 children,否则就 throw waning/error 终止程序


```js
function onlyChild(children) {
  !ReactElement.isValidElement(children) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'React.Children.only expected to receive a single React element child.') : _prodInvariant('143') : void 0;
  return children;
}

function onlyChildNoMinify(children){
  // 条件1 ? 值1 : (条件2 ? 值2 : (条件3 ? 值3 : (条件4 ? 值4 : 值5)));
}
```

## 多个三元表达式
> 条件1 ? 值1 : (条件2 ? 值2 : (条件3 ? 值3 : (条件4 ? 值4 : 值5)));
从右到左来执行，所以，任意都可以按上面的方式去改写。

```js
// 第一步：加括号
!ReactElement.isValidElement(children) ? (process.env.NODE_ENV !== 'production' ? invariant(false, 'React.Children.only expected to receive a single React element child.') : _prodInvariant('143')): void 0;

// 第二步：分解问题
// statment1-1:
process.env.NODE_ENV !== 'production' ? invariant(false, 'React.Children.only expected to receive a single React element child.') : _prodInvariant('143')
// statment1-2
if(process.env.NODE_ENV !== 'production'){
  invariant(false, 'React.Children.only expected to receive a single React element child.')
}else{
  _prodInvariant('143')
}

// statment2-1:
if(!ReactElement.isValidElement(children)){
  if(process.env.NODE_ENV !== 'production'){
    invariant(false, 'React.Children.only expected to receive a single React element child.')
  }else{
    _prodInvariant('143')
  }
}else{
  // 这里可以直接忽略
  void 0;
}

// statment2-2:
if(!ReactElement.isValidElement(children)){
  if(process.env.NODE_ENV !== 'production'){
    invariant(false, 'React.Children.only expected to receive a single React element child.')
  }else{
    _prodInvariant('143')
  }
}
return children
```

