import Header from './Header'
import Footer from './Footer'
import React, { Component } from 'react'
import { checkMetamaskInstall } from "../actions/commonActions"

export default class Layout extends Component {
  componentDidMount = () => {
    this.props.dispatch(checkMetamaskInstall())
  }

  render() {
    return (
      <div>
        <Header/>
        <div>{this.props.children}</div>
        <Footer/>
      </div>
    )
  }
}

