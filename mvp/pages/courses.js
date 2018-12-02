import Layout from '../app/components/Layout.js'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'

class Courses extends Component {
  render() {
    return (
      <Layout dispatch={this.props.dispatch}>
        <div className={"courses"}>
          <div className={"courses__header"}>
            <div className="small-container">
              <h2 className={"courses__header-title"}>Learn on Demand</h2>
              <div className={"courses__header-desc"}>
                <div>Easy payment, any token, one click.</div>
                <div>Course progression with guarantee.</div>
              </div>
              <div className={"courses__selling-point-container"}>
                <div className={"courses__selling-point"}>Funds release to token are based on course progression, withdraw at anytime.</div>
                <div className={"courses__selling-point"}>Payment is powered by token conversion, course fee is standardized with stable token.</div>
              </div>
            </div>
          </div>

          <div className={"courses__body"}>
            <div className={"container"}>
              <h3 className={"courses__body-title"}>Featured Courses</h3>
              <div className={"courses__course-container"}>
                <Link href={{ pathname: '/course', query: { id: 1 } }}>
                <div className={"courses__course"}>
                  <div className={"courses__course-background"} style={{backgroundImage: "url(/static/background-course-1.png)"}}/>
                  <div className={"courses__course-data"}>
                    <div className={"courses__course-marked"}>Best Seller</div>
                    <div className={"courses__course-lecturer-avatar"} style={{backgroundImage: "url(/static/expert-1.svg)"}}/>
                    <div className={"courses__course-title"}>AWS Certified Solutions Architect - Associate</div>
                    <div className={"courses__course-price"}>$10</div>
                    <div className={"courses__course-lecturer-name"}>Teacher - Gordon Linoff</div>
                    <div className={"courses__course-student"}>10 Students</div>
                    <div className={"courses__course-review"}>1 Reviews</div>
                    <Link href={{ pathname: '/course', query: { id: 1 } }}>
                      <a className={"courses__course-button common__button"}>Learn now</a>
                    </Link>
                  </div>
                </div>
                </Link>

                <Link href={{ pathname: '/course', query: { id: 2 } }}>
                <div className={"courses__course"}>
                  <div className={"courses__course-background"} style={{backgroundImage: "url(/static/background-course-2.png)"}}/>
                  <div className={"courses__course-data"}>
                    <div className={"courses__course-marked courses__course-marked--yellow"}>Highest Rated</div>
                    <div className={"courses__course-lecturer-avatar"} style={{backgroundImage: "url(/static/expert-2.svg)"}}/>
                    <div className={"courses__course-title"}>AWS Certified Solutions Architect - Associate</div>
                    <div className={"courses__course-price"}>$10</div>
                    <div className={"courses__course-lecturer-name"}>Teacher - Gordon Linoff</div>
                    <div className={"courses__course-student"}>10 Students</div>
                    <div className={"courses__course-review"}>1 Reviews</div>
                    <Link href={{ pathname: '/course', query: { id: 2 } }}>
                      <a className={"courses__course-button common__button"}>Learn now</a>
                    </Link>
                  </div>
                </div>
                </Link>

                <Link href={{ pathname: '/course', query: { id: 3 } }}>
                <div className={"courses__course"}>
                  <div className={"courses__course-background"} style={{backgroundImage: "url(/static/background-course-3.png)"}}/>
                  <div className={"courses__course-data"}>
                    <div className={"courses__course-lecturer-avatar"} style={{backgroundImage: "url(/static/expert-3.svg)"}}/>
                    <div className={"courses__course-title"}>AWS Certified Solutions Architect - Associate</div>
                    <div className={"courses__course-price"}>$10</div>
                    <div className={"courses__course-lecturer-name"}>Teacher - Gordon Linoff</div>
                    <div className={"courses__course-student"}>10 Students</div>
                    <div className={"courses__course-review"}>1 Reviews</div>
                    <Link href={{ pathname: '/course', query: { id: 3 } }}>
                      <a className={"courses__course-button common__button"}>Learn now</a>
                    </Link>
                  </div>
                </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default connect(state => state)(Courses)
