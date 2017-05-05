<h1 style="text-align: center">Typography | customize style</h1>

```javascript
const style = {
  color: 'winered',
  backgroundColor: 'pink',
  fontFamily: 'serif',
}

render(
  <Presentation>
    <Slide src={ './path/to/src.md' } type={ 'markdown' } style={ style } />
  </Presentation>,
  document.getElementById('presentation')
)
```
