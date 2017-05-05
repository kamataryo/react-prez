import React       from 'react'
import { shallow } from 'enzyme'
import { expect }  from 'chai'
// import sinon       from 'sinon'
import Progress from '../src/Progress.jsx'

describe('Progress Component, ', () => {

  describe('1) display plogress, ', () => {
    it('should render children', () => {
      const wrapper = shallow(<Progress length={ 10 } now={ 2 } />)
      expect(wrapper.find('.progress-text').text()).to.equal('2/10')
    })
  })
})
