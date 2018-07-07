# Container Components
> A container does data fetching and then renders its corresponding sub-component. That’s it.

> `“Corresponding”` meaning a component that shares the same name:

```conf
StockWidgetContainer => StockWidget
TagCloudContainer => TagCloud
PartyPooperListContainer => PartyPooperList
```
+ https://medium.com/@learnreact/container-components-c0e67432e005
+ https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0


## bad:
```js
class CommentList extends React.Component {
  this.state = { comments: [] };

  componentDidMount() {
    fetchSomeComments(comments =>
      this.setState({ comments: comments }));
  }
  render() {
    return (
      <ul>
        {this.state.comments.map(c => (
          <li>{c.body}—{c.author}</li>
        ))}
      </ul>
    );
  }
}
```


## good: ( Container Component)
```js
class CommentListContainer extends React.Component {
  state = { comments: [] };
  componentDidMount() {
    fetchSomeComments(comments =>
      this.setState({ comments: comments }));
  }
  render() {
    return <CommentList comments={this.state.comments} />;
  }
}

const CommentList = props =>
  <ul>
    {props.comments.map(c => (
      <li>{c.body}—{c.author}</li>
    ))}
  </ul>
```
