import Layout from '../app/components/Layout.js'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router';
import Web3 from 'web3';
import Modal from '../app/components/Modal';

class Course extends Component {
  constructor(props) {
    super(props);

    const url = "https://ropsten.infura.io";
    const web3 = new Web3(new Web3.providers.HttpProvider(url, 3000));
    const WRAPPER_ABI = [{"constant":false,"inputs":[{"name":"_orderId","type":"uint256"},{"name":"src","type":"address"}],"name":"withrawFundTeacher","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"ETH_TOKEN_ADDRESS","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"listCourse","outputs":[{"name":"price","type":"uint256"},{"name":"teacher","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_courseId","type":"uint256"},{"name":"_price","type":"uint256"}],"name":"addCourse","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_orderId","type":"uint256"},{"name":"src","type":"address"}],"name":"cancelOrder","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_adminAddr","type":"address"}],"name":"transferAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"listOrder","outputs":[{"name":"courseId","type":"uint256"},{"name":"orderTime","type":"uint256"},{"name":"user","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_courseId","type":"uint256"},{"name":"_orderId","type":"uint256"},{"name":"src","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"dest","type":"address"},{"name":"destAddress","type":"address"},{"name":"maxDestAmount","type":"uint256"},{"name":"minConversionRate","type":"uint256"},{"name":"kyberNetworkProxy","type":"address"},{"name":"walletId","type":"address"}],"name":"buyCourse","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"courseId","type":"uint256"},{"indexed":false,"name":"price","type":"uint256"},{"indexed":true,"name":"teacher","type":"address"}],"name":"AddCourse","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"courseId","type":"uint256"},{"indexed":true,"name":"orderId","type":"uint256"},{"indexed":true,"name":"user","type":"address"}],"name":"BuyCourse","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"teacher","type":"address"},{"indexed":false,"name":"priceUnlock","type":"uint256"},{"indexed":true,"name":"orderId","type":"uint256"}],"name":"TeacherWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"teacher","type":"address"},{"indexed":true,"name":"orderId","type":"uint256"},{"indexed":false,"name":"priceUnlock","type":"uint256"}],"name":"StudentCancel","type":"event"}];
    const wrapperContract = "0x3a20339e253f7ab78d51713eb28eac8588ae72eb";
    const ethWrapperContract = new web3.eth.Contract(WRAPPER_ABI, wrapperContract);

    this.state = {
      isLoading: false,
      orderId: Math.floor(Math.random() * 99999999),
      isWidgetModalActive: false,
      isCourseModalActive: false,
      isCourseBought: false,
      web3: web3,
      wrapperContract: wrapperContract,
      ethWrapperContract: ethWrapperContract
    }
  }

  handleCloseWidgetModal = () => {
    this.setState({isWidgetModalActive: false});
  };

  buyByTokens() {
    this.setState({
      isWidgetModalActive: true,
      isLoading: true
    });

    const params = {
      network: "ropsten",
      productId: this.props.router.query.id,
      productName: "AWS Certified Solutions Architect - Associate",
      productAvatar: "https://udemy-images.udemy.com/course/240x135/438522_500f_6.jpg",
      pinnedTokens: ["ETH", "DAI"],
      disabledTokens: []
    };
    const courseId = 3;
    const orderId = this.state.orderId;
    const srcToken = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
    const srcAmount = "100000000000000000";
    const dest = "0xad6d458402f60fd3bd25163575031acdce07538d";
    const destAddress = "0x3a20339e253f7ab78d51713eb28eac8588ae72eb";
    const maxDestAmount = "10000000000000000000";
    const minConversionRate = "575814601000000000000";
    const kyberNetworkProxy = "0x818e6fecd516ecc3849daf6845e3ec868087b755";
    const commissionId = "0x9559034c287a0e73a9a68288bc27eb8189427aa1";

    window.kyberWidgetInstance.render({
      appId: "kyber-widget",
      wrapper: this.state.wrapperContract,
      getPrice: function () {
        return new Promise((resolve) => {
          resolve(Math.pow(10, 17));
        })
      },
      getTxData: function() {
        const data = this.state.ethWrapperContract.methods.buyCourse(
          courseId, orderId, srcToken, srcAmount, dest, destAddress,
          maxDestAmount, minConversionRate, kyberNetworkProxy, commissionId
        ).encodeABI();

        return new Promise((resolve) => {
          resolve({ value: Math.pow(10, 17), data, gasLimit: 800000, to: this.state.wrapperContract })
        })
      }.bind(this),
      params,
      errors: {}
    })

    setTimeout(function() {
      this.setState({
        isCourseBought: true,
        isLoading: false
      });
    }.bind(this), 3000);
  }

  handleOpenCancelModal = () => {
    this.setState({isCourseModalActive: true});
  };

  handleCloseCancelModal = () => {
    this.setState({isCourseModalActive: false});
  };

  handleCancelling = () => {
    this.setState({isLoading: true});

    const data = this.state.ethWrapperContract.methods.cancelOrder(
      this.state.orderId,
      "0xad6d458402f60fd3bd25163575031acdce07538d"
    ).encodeABI();

    web3.eth.getCoinbase((error, result) => {
      console.log(error)
      if (error || !result) {
        var error = new Error("Cannot get coinbase")
        console.log(error)
      } else {
        web3.eth.sendTransaction({from: result, to: "0x3a20339e253f7ab78d51713eb28eac8588ae72eb", data: data}, function(err, transactionHash) {
          console.log(err)
          console.log(transactionHash)
          this.setState({
            isCourseBought: false,
            isLoading: false
          })
        }.bind(this))
      }
    })
    

    this.handleCloseCancelModal();
  };

  render() {
    return (
      <Layout dispatch={this.props.dispatch}>
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
                  <span className="learner">123,456 Learners</span>
                  <span className="review">1000 Reviews</span>
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
                  <div className={"first-row-info first-item"}>
                  Learn the latest technology on your terms. Pick up where you left off across any device, or download videos for offline viewing.
                  </div>
                  <div className={"first-row-info"}>
                  Create and manage playlists that align to the technical skills you want to acquire.
                  </div>
                </div>
                <div className={"second-row"}>
                  <div className={"row-main-title"}>
                    Requirements
                  </div>
                  <div className={"text-content"}>
                  There is no software, hardware or experience required in order to complete this course, but practicing the techniques discussed on an emulator or live PLC are necessary steps toward eventual mastery.
                  </div>
                </div>
                <div className={"third-row"}>
                  <div className={"row-main-title"}>Description</div>
                  <div className={"text-content"}>
                  This course is designed to equip the novice with no prior PLC programming experience with the basic tools necessary to create a complete PLC program using ladder logic common to most current platforms. Using the Rockwell software RSLogix 500 and FactoryTalk View Studio, we will be covering such topics as general controls, digital and analog IO, ladder logic programming, alarm / notification handling, HMI, emulation, best practices and more. In the end, we will go through an entire, working PLC program and HMI line by line to solidify comprehension of the learning objectives.
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
                        <span>10</span>
                        <span>USD</span>
                      </div>
                      <div>Lesson time: 3 weeks</div>
                    </div>
                    <div className={"highest-rate"}>
                      Highest rate
                    </div>
                  </div>
                  <div className={"second-col-third-row"}>
                    {!this.state.isCourseBought && (
                      <button onClick={() => this.buyByTokens()}>
                        {this.state.isLoading ? "Loading..." : "Learn now"}
                      </button>
                    )}

                    {this.state.isCourseBought && (
                      <button className="course-cancel-button" onClick={() => this.handleOpenCancelModal()}>
                        {this.state.isLoading ? "Loading..." : "Cancel this Course"}
                      </button>
                    )}
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
                      <div className="courese-icon"><span>Courses </span><span>23000</span></div>
                      <div className="learner-icon"><span>Learners </span><span>600000</span></div>
                    </div>
                  </div>
                </div>
                <div className={"table-content"}>
                  <div className={"lesson"}>Table of content</div>
                  <div className={"lesson"}>
                    <div>Lession 1: </div>
                    <div>Take any one of these courses, and prepare to earn a <strong>Microsoft Technology Associate (MTA)</strong></div>
                  </div>
                  <div className={"lesson"}>
                    <div>Lession 2: </div>
                    <div>Take these courses, and prepare to earn a <strong>Microsoft Certified Solutions Associate (MCSA): Windows Server 2016</strong>  certification.</div>
                  </div>
                  <div className={"lesson"}>
                    <div>Lession 3: </div>
                    <div>Take these courses, and prepare to earn a <strong>Microsoft Certified Solutions Associate (MCSA): Windows Server 2012</strong> certification.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={"wrapper-footer"}>
            <div className={"feedback-title"}>Learners Feedback</div>
            <div className={"rating"}>
              {/* <div className={"average-rate"}></div>    
              <div className={"rate-point"}>
                <div className={"rate"}>
                  <div className={"number-rate"}></div>
                  <div className={"start-5"}></div>
                  <div className={"percent"}>80%</div>
                </div>
                <div className={"rate"}>
                  <div className={"number-rate"}></div>
                  <div className={"start-4"}></div>
                  <div className={"percent"}>10%</div>
                </div>
                <div className={"rate"}>
                  <div className={"number-rate"}></div>
                  <div className={"start-3"}></div>
                  <div className={"percent"}>10%</div>
                </div>
                <div className={"rate"}>
                  <div className={"number-rate"}></div>
                  <div className={"start-2"}></div>
                  <div className={"percent"}>0%</div>
                </div>
              </div> */}
            </div>
            <div className={"review"}>
              <div className={"review-title"}>Reviews</div>
              <div className={"input"}>
                <input type="text" placeholder="type your comment..."/>
              </div>
              <div className={"submit"}>
                <a href="">Submit</a> 
              </div>
              <div className={"comment"}>
                <div className={"comment-item"}>
                  <div className="avatar"></div>
                  <div className="reviewer-info">
                    <div className="address">
                      <div>0x72D48BC48311109DDc5852529c116c1853F07067</div>
                      <div className={"rate-star"}></div>
                    </div>
                    <div className={"date"}>2/11/2018</div>
                    <div className="comment-content">
                      The lesson is very useful, the teachers are very enthusiastic and scientific on teaching. The payment method is also very modern, expect yous guys will extend this model more and more :)
                    </div>
                  </div>
                </div>
                <div className={"comment-item"}>
                  <div className="avatar"></div>
                  <div className="reviewer-info">
                    <div className="address">
                      <div>0x50dFb046885f58127E55EF8D854EA546AAB72DfB</div>
                      <div className={"rate-star"}></div>
                    </div>
                    <div className={"date"}>1/11/2018</div>
                    <div className="comment-content">Why is it trying to individually re-sign sub frameworks, and what can I do to alleviate the issues? I need the archiving to work normally with Xcode 10, along with any future third party dependencies being added to my framework target. (This is the first dynamic framework dependency added to my Framework target. Before I was "baking in" - in-boarding all 3rd parties for ease of development purposes, but PromiseKit is difficult to inboard due to extensive dependencies on Objective-c). 
                      Why is it trying to individually re-sign sub frameworks, and what can I do to alleviate the issues? I need the archiving to work normally with Xcode 10, along with any future third party dependencies being added to my framework target. (This is the first dynamic framework dependency added to my Framework target. Before I was "baking in" - in-boarding all 3rd parties for ease of development purposes, but PromiseKit is difficult to inboard due to extensive dependencies on Objective-c).
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>

        <Modal isActive={this.state.isWidgetModalActive} handleClose={this.handleCloseWidgetModal}>
          <div className={"common__kyber-widget-container"}>
            <div id="kyber-widget" className="kyber_widget"></div>
          </div>
        </Modal>

        <Modal isActive={this.state.isCourseModalActive} handleClose={this.handleCloseCancelModal}>
          <div className={"cancel-course"}>
            <h2>Reason of cancelling this course?</h2>
            <form>
              <label>
                <input type="radio" name="reason" value="1"/>
                It's not suitable for me
              </label>
              <label>
                <input type="radio" name="reason" value="2"/>
                There is nothing new I can learn from this course
              </label>
              <label>
                <input type="radio" name="reason" value="3"/>
                I'm out of money at the moment, so I need to refund to get by
              </label>
              <label>
                <input type="radio" name="reason" value="4"/>
                I dont know what this course is talking about
              </label>
            </form>
            <div className={"flex"}>
              <div className={"button-cancel"} onClick={() => this.handleCloseCancelModal()}>Cancel</div>
              <div className={"button-confirm"} onClick={() => this.handleCancelling()}>Confirm</div>
            </div>
          </div>
        </Modal>
      </Layout>
    )
  }
}

export default connect(state => state)(withRouter(Course))
