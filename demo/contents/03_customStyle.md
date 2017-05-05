<h1 style="text-align: center">Typography | customize style</h1>

```javascript
const style = {
  fontFamily      : 'serif',
  color           : '#880E4F',
  backgroundColor : '#ffcdd2',
}

render(
  <Presentation>
    <Slide src={ './path/to/src.md' } type={ 'markdown' } style={ style } />
  </Presentation>,
  document.getElementById('presentation')
)
```
