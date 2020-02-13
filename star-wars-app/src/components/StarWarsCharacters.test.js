import axios from 'axios';
import React from 'react';
import * as rtl from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StarWarsCharacters from './StarWarsCharacters';
import App from '../App';

//rests the mock to test if called
afterEach(() => {
    jest.clearAllMocks();
  });


jest.mock("axios", () => {
    return {
      get: jest.fn(() => Promise.resolve({
        data: {
          count: 0,
          next: 'url',
          previous: 'url',
          results: [{name:'pete'}, {name:'luke'}]
        }
      }))
    }
  })

test("Made API call", async () => {
    const wrapper = rtl.render(<StarWarsCharacters />);
    // This waits for our initial useEffect async operation to run,
    // which is what makes our API call
    await wrapper.findAllByTestId(/apiReturn/i);

    //can also write like this
    // await wrapper.findAllByTestId('apiReturn');

  
    // Since our mocked axios.get call is a spy, we can see what it has been up to
    expect(axios.get).toHaveBeenCalled()
  })



  test("next button", async () => {

    const wrapper = rtl.render(<StarWarsCharacters />);
  
    const next = wrapper.getByText(/next/i)
  
    // Simulate the act of a user clicking on the button
    rtl.act(() => {
      rtl.fireEvent.click(next)
    })
  
    expect(axios.get).toHaveBeenCalled()
  })

  test("previous button", async () => {

    const wrapper = rtl.render(<StarWarsCharacters />);
  
    const prev = wrapper.getByText(/prev/i)
  
    // Simulate the act of a user clicking on the button
    rtl.act(() => {
      rtl.fireEvent.click(prev)
    })
  
    expect(axios.get).toHaveBeenCalled()
  })
  

