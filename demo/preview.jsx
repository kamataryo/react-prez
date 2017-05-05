/**
 * preview React Prez
 * @file
 */

import React      from 'react'
import { render } from 'react-dom'
import Presentation, { Slide } from '../src/index'

render(
  <Presentation>
    <Slide src={ './contents/00_cover.md' }       type={ 'markdown' } />
    <Slide src={ './contents/01_typography1.md' } type={ 'markdown' } />
    <Slide src={ './contents/02_typography2.md' } type={ 'markdown' } />
  </Presentation>,
  document.getElementById('presentation')
)
