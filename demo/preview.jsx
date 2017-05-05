/**
 * preview React Prez
 * @file
 */

import React      from 'react'
import { render } from 'react-dom'
import Presentation, { Slide } from '../src/index'

const style3 = {
  color: 'winered',
  backgroundColor: 'pink',
  fontFamily: 'serif',
}

render(
  <Presentation>
    <Slide src={ './contents/00_cover.md' }       type={ 'markdown' } />
    <Slide src={ './contents/00_usage.md' }       type={ 'markdown' } />
    <Slide src={ './contents/01_typography1.md' } type={ 'markdown' } />
    <Slide src={ './contents/02_typography2.md' } type={ 'markdown' } />
    <Slide src={ './contents/03_customStyle.md' } type={ 'markdown' } style={ style3 } />
  </Presentation>,
  document.getElementById('presentation')
)
