/**
 *
 * @file
 */

import React      from 'react'
import { render } from 'react-dom'
import Presentation, { Slide } from '../src/Presentation.jsx'
import contents from './contents'

render(
  <Presentation>
    <Slide content={ contents[0] } type={ 'md' } />
    <Slide content={ contents[1] } type={ 'md' } />
    <Slide content={ contents[2] } type={ 'md' } />
  </Presentation>,
  document.getElementById('presentation')
)
