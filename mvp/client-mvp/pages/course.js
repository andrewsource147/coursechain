import Layout from '../app/components/Layout.js'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'

class Course extends Component {
  render() {
    return (
      <Layout dispatch={this.props.dispatch}>
        {/* {this.props.router.query.id} */}
        <div className={"course-detail"}>
          <div className={"first-component-background"}>
            <div className="first-component">
              <div className={"first-col"}>
                <div className={"big-title"}>Window Server 2016 - Practical Guide For Beginners</div>
                <div className={"small-title"}>
                  Active Directory, DHCP, DNS, GPO, RAID, NTFS, PowerShell, HP Microserver, tips for Microsoft Windows Server 2016
                </div>
                <div className={"info-detail"}>
                  <span>Teacher - Gordon Linoff</span>
                  <span>Last updated 11/2018</span>
                </div>
                <div className={"info-detail"}>
                  <span>123,456 Learners</span>
                  <span>123,456 Learners</span>
                </div>
              </div>
              <div>
              </div>
            </div>
          </div>
          <div className={"wrapper-component"}>
            <div className="second-component">
              <div className={"first-col"}>
                <div className={"first-row"}>
                  <div className={"row-main-title"}>What you will learn</div>
                  <div className={"first-row-info"}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc volutpat enim vulputate nulla blandit, sit amet consequat dui pretium.
                  </div>
                  <div className={"first-row-info"}>
                    Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras mollis orci at lorem congue, id euismod justo venenatis.
                  </div>
                </div>
                <div className={"second-row"}>
                  <div className={"row-main-title"}>
                    Requirements
                  </div>
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc volutpat enim vulputate nulla blandit, sit amet consequat dui pretium. 
                  </div>
                </div>
                <div className={"third-row"}>
                  <div className={"row-main-title"}>Description</div>
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc volutpat enim vulputate nulla blandit, sit amet consequat dui pretium. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras mollis orci at lorem congue, id euismod justo venenatis. 
                    In nec ligula ac orci posuere ullamcorper tempor a mauris. Duis iaculis massa et interdum auctor. Nam vulputate enim sit amet lorem lobortis faucibus. Sed iaculis sit amet purus ut lacinia.
                  </div>
                </div>
              </div>
              <div className={"second-col"}>
                <div className={"second-col-first-row"}>
                </div>
                <div className={"second-col-content"}>
                  <div className={"second-col-second-row"}>
                    <div>
                      <div>Course Fee</div>
                      <div>
                        <span>499</span>
                        <span>USD</span>
                      </div>
                      <div>Lesson time: 3 weeks</div>
                    </div>
                    <div className={"highest-rate"}>
                      Highest rate
                    </div>
                  </div>
                  <div className={"second-col-third-row"}>
                    <button>Learn now</button>
                  </div>
                  <div className={"second-col-forth-row"}>
                    <div>Include</div>
                    <div className={"item"}>2.5 hours on-demand video</div>
                    <div className={"item"}>1 article</div>
                    <div className={"item"}>5 downloadable resources</div>
                    <div className={"item"}>Full lifetime access</div>
                    <div className={"item"}>Certificate of Completion</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="third-component">
              <div className={"first-col"}>
                <div className={"user-info-full"}>
                  <div></div>
                  <div className={"user-info"}>
                    <div className={"user-name"}>Gordon Linoff</div>
                    <div>Cisco CCNA, IT Networking Fundamentals</div>
                    <div>
                      <div><span>Courses </span><span>23000</span></div>
                      <div><span>Learners </span><span>600000</span></div>
                    </div>
                  </div>
                </div>
                <div className={"table-content"}>
                  <div className={"lesson"}>Table of content</div>
                  <div className={"lesson"}>
                    <div>Lession 1: </div>
                    <div>Introduction</div>
                  </div>
                  <div className={"lesson"}>
                    <div>Lession 2: </div>
                    <div>Content</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={"wrapper-footer"}>
  
          </div>
          <div></div>
        </div>
      </Layout>
    )
  }
}

export default connect(state => state)(withRouter(Course))
