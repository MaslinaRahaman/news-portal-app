import React from "react";
import ReactDOM from "react-dom";
import App from "../../App";
import Navbar from "../Navbar";
import NewsList from "../NewsList";
import {render , fireEvent} from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import * as APIService from "../api"

jest.mock("../api");


test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("api call with location and activeItem value",async()=>{
    const mockedFetch=  APIService.getData().mockResolvedValueOnce({status:200})
    const {getByTestId}= render(<NewsList />);
    const headerEl =  getByTestId('category'));
    expect(headerEl).toHaveTextContent('BUSINESS');
      expect(mockedFetch).toBeCalledTimes(1);
})

test("search term renders with initial value",()=>{
    //renders in  virtual dom
   const {getByTestId}= render(<Navbar />);
    const inputEl = getByTestId("searchTerm");

    expect(inputEl.textContent).toBe("trump")
})

