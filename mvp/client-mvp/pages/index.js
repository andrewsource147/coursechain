import Layout from '../app/components/Layout.js'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class CourseList extends Component {
  render() {
    return (
      <Layout dispatch={this.props.dispatch}>
        Test
      </Layout>
    )
  }
}

export default connect(state => state)(CourseList)

