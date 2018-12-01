import Header from './Header'
import Footer from './Footer'
import React, { Component } from 'react'
import { checkMetamaskInstall } from "../actions/commonActions"
import Link from 'next/link'

export default class Layout extends Component {
  componentDidMount = () => {
    this.props.dispatch(checkMetamaskInstall())
  }

  isActive = (path, subpath) => {
    return this.props.path === path || this.props.path === subpath
  }

  render() {
    return (
      <div>
        <Header/>
        <div className={"content-layout"}>
          <div className={"grid-x"}>
            <div className={"side-bar cell large-3"}>
              <Link href="/"><h2>Category</h2></Link>
              <Link href="/">
                <div>IT & Software</div>
              </Link>
              <Link href="/">
                <div>IT Certification</div>
              </Link>
              <Link href="/">
                <div>Network & Security</div>
              </Link>
              <Link href="/">
                <div>Hardware</div>
              </Link>
              <Link href="/">
                <div>Operation System</div>
              </Link>
              <Link href="/">
                <div>Other</div>
              </Link>
            </div>
            <div className={"cell large-9"}>{this.props.children}</div>
          </div>
        </div>
        <Footer/>
      </div>
    )}
}

