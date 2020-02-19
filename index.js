import React from "react"
import ReactDOM from "react-dom"

import "babel-polyfill"

import { Content, Header } from "./article"

if (module.hot) {
  module.hot.accept()
}

ReactDOM.render(<Content />, document.querySelector("d-article"))
ReactDOM.render(<Header />, document.querySelector("d-title"))
