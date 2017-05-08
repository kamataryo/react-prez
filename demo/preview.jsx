/**
 * preview React Prez
 * @file
 */

import React      from 'react'
import { render } from 'react-dom'
import Presentation, { Slide } from '../src/index'

const style3 = {
  color           : '#880E4F',
  backgroundColor : '#ffcdd2',
  fontFamily      : 'serif',
}

render(
  <Presentation>
    <Slide src={ './contents/00_cover.md' }       type={ 'markdown' } />
    <Slide src={ './contents/00_usage.md' }       type={ 'markdown' } />
    <Slide src={ './contents/01_typography1.md' } type={ 'markdown' } />
    <Slide src={ './contents/02_typography2.md' } type={ 'markdown' } />
    <Slide src={ './contents/03_customStyle.md' } type={ 'markdown' } style={ style3 } />
    <Slide src={ './contents/04_API_Presentation.md' } type={ 'markdown' } />
    <Slide src={ './contents/05_API_Slide.md' } type={ 'markdown' } />
    <Slide src={ './contents/06_controller.md' } type={ 'markdown' } />
    <Slide src={ './contents/07_synchronizing.md' } type={ 'markdown' } />
    <Slide src={ './contents/08_remotecontrol.md' } type={ 'markdown' } />
  </Presentation>,
  document.getElementById('presentation')
)
