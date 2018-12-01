import Layout from '../app/components/Layout.js'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router';
import Web3 from 'web3';
import Modal from '../app/components/Modal';

class Course extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isWidgetModalActive: false
    }
  }

  handleCloseWidgetModal = () => {
    this.setState({isWidgetModalActive: false});
  };

  buyByTokens() {
    this.setState({isWidgetModalActive: true});

    const params = {
      network: "ropsten",
      productId: this.props.router.query.id,
      productName: "AWS Certified Solutions Architect - Associate",
      productAvatar: "https://udemy-images.udemy.com/course/240x135/438522_500f_6.jpg",
      pinnedTokens: ["ETH", "DAI"],
      disabledTokens: []
    };
    const url = "https://ropsten.infura.io";
    const web3 = new Web3(new Web3.providers.HttpProvider(url, 3000));
    const WRAPPER_ABI = [{"constant":false,"inputs":[{"name":"_orderId","type":"uint256"},{"name":"src","type":"address"}],"name":"withrawFundTeacher","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"ETH_TOKEN_ADDRESS","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"listCourse","outputs":[{"name":"price","type":"uint256"},{"name":"teacher","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_courseId","type":"uint256"},{"name":"_price","type":"uint256"}],"name":"addCourse","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_orderId","type":"uint256"},{"name":"src","type":"address"}],"name":"cancelOrder","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_adminAddr","type":"address"}],"name":"transferAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"listOrder","outputs":[{"name":"courseId","type":"uint256"},{"name":"orderTime","type":"uint256"},{"name":"user","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_courseId","type":"uint256"},{"name":"_orderId","type":"uint256"},{"name":"src","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"dest","type":"address"},{"name":"destAddress","type":"address"},{"name":"maxDestAmount","type":"uint256"},{"name":"minConversionRate","type":"uint256"},{"name":"kyberNetworkProxy","type":"address"},{"name":"walletId","type":"address"}],"name":"buyCourse","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"courseId","type":"uint256"},{"indexed":false,"name":"price","type":"uint256"},{"indexed":true,"name":"teacher","type":"address"}],"name":"AddCourse","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"courseId","type":"uint256"},{"indexed":true,"name":"orderId","type":"uint256"},{"indexed":true,"name":"user","type":"address"}],"name":"BuyCourse","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"teacher","type":"address"},{"indexed":false,"name":"priceUnlock","type":"uint256"},{"indexed":true,"name":"orderId","type":"uint256"}],"name":"TeacherWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"teacher","type":"address"},{"indexed":true,"name":"orderId","type":"uint256"},{"indexed":false,"name":"priceUnlock","type":"uint256"}],"name":"StudentCancel","type":"event"}];
    const wrapperContract = "0x3a20339e253f7ab78d51713eb28eac8588ae72eb";
    const ethWrapperContract = new web3.eth.Contract(WRAPPER_ABI, wrapperContract);

    const courseId = 3;
    const orderId = 3;
    const dest = "0xad6d458402f60fd3bd25163575031acdce07538d";
    const destAddress = wrapperContract;
    const maxDesAmount = "10000000000000000000";
    const minConvertRate = "149937500000000000000";
    const kyberNetworkProxy = "0x818e6fecd516ecc3849daf6845e3ec868087b755";
    const commissionId = "0x9559034c287a0e73a9a68288bc27eb8189427aa1";

    window.kyberWidgetInstance.render({
      appId: "kyber-widget",
      wrapper: wrapperContract,
      getPrice: function () {
        return new Promise((resolve) => {
          resolve(Math.pow(10, 17));
        })
      },
      getTxData: function(sourceToken, sourceAmount) {
        const data = ethWrapperContract.methods.buyCourse(
          courseId, orderId, sourceToken, sourceAmount, dest, destAddress,
          maxDesAmount, minConvertRate, kyberNetworkProxy, commissionId
        ).encodeABI();

        return new Promise((resolve) => {
          resolve({ value: 0, data, gasLimit: 800000, to: wrapperContract })
        })
      },
      params,
      errors: {}
    })
  }

  render() {
    return (
      <Layout dispatch={this.props.dispatch}>
        <button onClick={() => this.buyByTokens()}>OPEN</button>

        <Modal isActive={this.state.isWidgetModalActive} handleClose={this.handleCloseWidgetModal}>
          <div className={"common__kyber-widget-container"}>
            <div id="kyber-widget" className="kyber_widget"></div>
          </div>
        </Modal>
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
