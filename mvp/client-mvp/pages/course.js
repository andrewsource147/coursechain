import Layout from '../app/components/Layout.js'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'

class Course extends Component {
  render() {
    return (
      <Layout dispatch={this.props.dispatch}>
        {this.props.router.query.id}
      </Layout>
    )
  }
}

export default connect(state => state)(withRouter(Course))
