import Layout from '../app/components/Layout.js'
import Link from 'next/link'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { courseActionTypes } from '../app/actions/courseActions'

class CourseList extends Component {
  componentDidMount = () => {
    this.props.dispatch({type: courseActionTypes.FETCH_COURSES});
  };

  render() {
    return (
      <Layout dispatch={this.props.dispatch} path={"/"}>
        Test
      </Layout>
    )
  }
}

export default connect(state => state)(CourseList)

