<h1 style="text-align: center">Typography | customize style</h1>

```javascript
import react                   from 'react'
import { render }              from 'react-dom'
import { Presentation, Slide } from 'react-prez'

render(
  <Presentation>
    <Slide src={ './path/to/src.md' } type={ 'markdown' } />
    <Slide><h1>Html Element as Children</h1><p>You can do as this is.</p></Slide>
  </Presentation>,
  document.getElementById('presentation')
)
```
