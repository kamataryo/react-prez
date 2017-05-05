<h1 style="text-align: center">Usage</h1>

```javascript
import react                   from 'react'
import { render }              from 'react-dom'
import { Presentation, Slide } from 'react-prez'

render(
  <Presentation>
    <Slide src={ './path/to/src.md' } type={ 'markdown' } />
    <Slide src={ '//example.com/src.md' } type={ 'markdown' } />
    <Slide><h1>title</h1><p>paragraphs</p></Slide>
  </Presentation>,
  document.getElementById('presentation')
)
```
