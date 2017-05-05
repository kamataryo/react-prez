/**
 *
 * @file
 */

import React      from 'react'
import { render } from 'react-dom'
import Presentation, { Slide } from '../src/index'
import contents from './contents'

render(
  <Presentation>
    <Slide src={ './contents/_content3.html' } type={ 'html' } />
    <Slide>{ contents[0] }</Slide>
    <Slide>{ contents[1] }</Slide>
    <Slide>{ contents[2] }</Slide>
  </Presentation>,
  document.getElementById('presentation')
)
