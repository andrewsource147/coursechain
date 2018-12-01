import Layout from '../app/components/Layout.js'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Courses extends Component {
  render() {
    return (
      <Layout dispatch={this.props.dispatch}>
        <div className={"courses"}>
          <div className={"courses__header"}>
            <div className="small-container">
              <h2 className={"courses__header-title"}>Learn on Demand</h2>
              <div className={"courses__selling-point-container"}>
                <div className={"courses__selling-point"}>Easy payment, any token, one click.</div>
                <div className={"courses__selling-point"}>Course progression with guarantee.</div>
              </div>
            </div>
          </div>

          <div className={"courses__body"}>
            <div className={"container"}>
              <h3 className={"courses__body-title"}>Featured Courses</h3>
              <div className={"courses__course-container"}>
                <div className={"courses__course"}>
                  <div className={"courses__course-background"} style={{backgroundImage: "url(/static/background-course-1.png)"}}/>
                  <div className={"courses__course-data"}>
                    <div className={"courses__course-lecturer-avatar"} style={{backgroundImage: "url(/static/expert-1.svg)"}}/>
                    <div className={"courses__course-title"}>AWS Certified Solutions Architect - Associate</div>
                    <div className={"courses__course-price"}>$600</div>
                    <div className={"courses__course-lecturer-name"}>Teacher - Gordon Linoff</div>
                    <div className={"courses__course-student"}>10 Students</div>
                    <div className={"courses__course-review"}>1 Reviews</div>
                    <a href={"/"} className={"courses__course-button common__button"}>Apply NOW</a>
                  </div>
                </div>

                <div className={"courses__course"}>
                  <div className={"courses__course-background"} style={{backgroundImage: "url(/static/background-course-2.png)"}}/>
                  <div className={"courses__course-data"}>
                    <div className={"courses__course-lecturer-avatar"} style={{backgroundImage: "url(/static/expert-2.svg)"}}/>
                    <div className={"courses__course-title"}>AWS Certified Solutions Architect - Associate</div>
                    <div className={"courses__course-price"}>$600</div>
                    <div className={"courses__course-lecturer-name"}>Teacher - Gordon Linoff</div>
                    <div className={"courses__course-student"}>10 Students</div>
                    <div className={"courses__course-review"}>1 Reviews</div>
                    <a href={"/"} className={"courses__course-button common__button"}>Apply NOW</a>
                  </div>
                </div>

                <div className={"courses__course"}>
                  <div className={"courses__course-background"} style={{backgroundImage: "url(/static/background-course-3.png)"}}/>
                  <div className={"courses__course-data"}>
                    <div className={"courses__course-lecturer-avatar"} style={{backgroundImage: "url(/static/expert-3.svg)"}}/>
                    <div className={"courses__course-title"}>AWS Certified Solutions Architect - Associate</div>
                    <div className={"courses__course-price"}>$600</div>
                    <div className={"courses__course-lecturer-name"}>Teacher - Gordon Linoff</div>
                    <div className={"courses__course-student"}>10 Students</div>
                    <div className={"courses__course-review"}>1 Reviews</div>
                    <a href={"/"} className={"courses__course-button common__button"}>Apply NOW</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default connect(state => state)(Courses)
