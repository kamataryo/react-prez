# React-Prez

[![Build Status](https://travis-ci.org/kamataryo/react-prez.svg?branch=master)](https://travis-ci.org/kamataryo/react-prez)
[![npm](https://img.shields.io/npm/v/react-prez.svg)](https://www.npmjs.com/package/react-prez)

Make presentations with React and Markdown!

[DEMO](https://kamataryo.github.io/react-prez/)

### install

```shell
$ npm install react react-dom prop-types --save
$ npm install react-prez --save
```

### usage

```jsx
import React      from 'react'
import { render } from 'react-dom'
import { Presentation, Slide } from 'react-prez'

const contents = [
  'presentation content0',
  'presentation content1',  
]

render(
  <Presentation>
    <Slide content={ contents[0] } />
    <Slide content={ contents[1] } />
  </Presentation>,
  document.getElementById('app')
)

```

## development

```shell
$ git clone git@github.com:kamataryo/react-prez.git
$ cd react-prez
$ npm install
$ npm test  
$ npm run build
$ npm start
```

## release (for commiters)

```shell
$ npm version patch
```
