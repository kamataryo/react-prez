import React       from 'react'
import { shallow } from 'enzyme'
import { expect }  from 'chai'
import Slide from '../src/Slide.jsx'

describe('Slide Component, ', () => {

  describe('1) childrens, ', () => {
    it('should render text children', () => {
      const wrapper = shallow(<Slide>{ 'xyz' }</Slide>)
      expect(wrapper.text()).to.equal('xyz')
    })

    it('should render html children', () => {
      const wrapper = shallow(<Slide><div id={ 'children' } /></Slide>)
      expect(wrapper.find('#children')).to.have.length(1)
    })

    it('should render state.content with src props', () => {
      const wrapper = shallow(<Slide src={ 'dummy' } />)
      wrapper.setState({ content: 'abc' })
      expect(wrapper.text()).to.equal('abc')
    })

    it('should not render state.content without src props', () => {
      const wrapper = shallow(<Slide />)
      wrapper.setState({ content: 'abc' })
      expect(wrapper.text()).to.equal('')
    })
  })
})
