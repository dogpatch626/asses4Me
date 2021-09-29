// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { configure , shallow } from 'enzyme';
import '@testing-library/jest-dom';
configure({ adapter: new Adapter() });

test('renders ', ()=>{
    render(<App />);
    
     
    
})