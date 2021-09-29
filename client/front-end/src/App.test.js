import { render, screen } from '@testing-library/react';
import { mount , shallow } from 'enzyme';

import React from 'react'
import App from './App';
import Navbar from './components/Navbar'


describe("Does React APP get rendered",()=>{
  let wrapper; 
  beforeEach(()=>{
    wrapper = mount(<App />)
  })
  test('Renders App function <App />', () => {
    
    render(<App />);
   
  });

  test('Navbar is NOT rendered without validation ', ()=>{
    // console.log(wrapper.debug())
      expect(wrapper.find(Navbar)).toHaveLength(0); 
  })
})
