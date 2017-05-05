import React       from 'react'
import { shallow } from 'enzyme'
import { expect }  from 'chai'
// import sinon       from 'sinon'
import Presentation from '../src/Presentation.jsx'

describe('Presentation Component, ', () => {

  describe('1) childrens, ', () => {
    it('should render children', () => {
      const wrapper = shallow(<Presentation>
        <div className={ 'children' } />
        <div className={ 'children' } />
      </Presentation>)
      expect(wrapper.find('.children')).to.have.length(2)
    })
  })
})
