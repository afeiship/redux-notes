# Children.only:
> 这样只会返回一个child。如果不止一个child，它就会抛出错误，让整个程序陷入中断——完美的避开了试图破坏组件的懒惰的开发者。

## code:
```js
class Executioner extends React.Component {
  render() {
    return React.Children.only(this.props.children)()
  }
}
```

## resouce:
- https://www.jianshu.com/p/d1975493b5ea
