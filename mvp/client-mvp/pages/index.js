import Layout from '../app/components/Layout.js'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class CourseList extends Component {
  render() {
    return (
      <Layout dispatch={this.props.dispatch}>
        <div>
          {/* <div class="home-header">
            <div class="home-logo">
              <img src="asset/img/logo.png" alt="" class="home-logo-img" />
              <div class="home-logo-title">
                <a href="#">CourseChain</a>
              </div>
            </div>
            <div class="menu-bar">
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About us</a></li>
              </ul>
            </div>
            <div class="sign-in">
              <div></div>
              <div class="text">Sign in</div>
            </div>
          </div> */}
          <div class="home-overview">
            <div class="wrapper">
                <div class="content">
                  <div class="hone-background">
                  </div>
                </div>
                <div class="intro-div">
                  <div class="intro">
                    <h3>Our Project</h3>
                    <div class="description">
                    A platform for distribution of online courses, using blockchain to encourage the educational values of online learning.
                    </div>
                    <div class="detail">
                      Course progression guarantee: Funds are locked in smart contract, and only release upon milestones.
                    </div>
                    <div class="detail">
                      Learners can withdraw from the course and be partially refunded. Teachers are encouraged to actively keep the students on tracks.
                    </div>
                    <div class="detail">
                      Easy payment for students, with automatic token conversion.
                    </div>
                    <div class="detail">
                    Token conversion enable payment to teacher with stable token to standardize the course's fee.
                    </div>
                    <div class="try-it">
                      <button class="btn-sc">Try it now</button>
                    </div>
                  </div>
                </div>
                <div class="member">
                  <h3>Our Team</h3>
                  <div class="member-detail">
                    <div class="profile">
                      <div class="avatar"></div>
                      <div class="name">Trung Xuan</div>
                      <div class="role">Developer</div>
                      <div class="media">
                        <div class="item"></div>
                        <div class="item"></div>
                        <div class="item"></div>
                      </div>
                    </div>
                    <div class="profile">
                      <div class="avatar"></div>
                      <div class="name">Cuong Nguyen</div>
                      <div class="role">Developer</div>
                      <div class="media">
                        <div class="item"></div>
                        <div class="item"></div>
                        <div class="item"></div>
                      </div>
                    </div>
                    <div class="profile">
                      <div class="avatar"></div>
                      <div class="name">Thanh Nguyen</div>
                      <div class="role">Developer</div>
                      <div class="media">
                        <div class="item"></div>
                        <div class="item"></div>
                        <div class="item"></div>
                      </div>
                    </div>
                    <div class="profile">
                      <div class="avatar"></div>
                      <div class="name">Ha Minh Le</div>
                      <div class="role">Designer</div>
                      <div class="media">
                        <div class="item"></div>
                        <div class="item"></div>
                        <div class="item"></div>
                      </div>
                    </div>
                    <div class="profile">
                      <div class="avatar"></div>
                      <div class="name">Liem Nguyen</div>
                      <div class="role">Developer</div>
                      <div class="media">
                        <div class="item"></div>
                        <div class="item"></div>
                        <div class="item"></div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <div class="contact-us">
            <h5>Contact us!</h5>
            <div class="send-email">
              <button class="btn-sc">Send email</button>
            </div>
          </div>
          {/* <div class="home-footer"></div> */}
        </div>
      </Layout>
    )
  }
}

export default connect(state => state)(CourseList)

