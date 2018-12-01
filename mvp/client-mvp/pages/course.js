import Layout from '../app/components/Layout.js'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router';
import Web3 from 'web3';

class Course extends Component {
  buyByTokens() {
    const params = {
      network: "ropsten",
      productId: 1,
      productName: "AWS Certified Solutions Architect - Associate",
      productAvatar: "https://udemy-images.udemy.com/course/240x135/438522_500f_6.jpg",
      pinnedTokens: ["ETH", "DAI"]
    };
    const url = "https://ropsten.infura.io";
    const web3 = new Web3(new Web3.providers.HttpProvider(url, 3000));
    const WRAPPER_ABI = [{"constant":false,"inputs":[{"name":"_orderId","type":"uint256"},{"name":"src","type":"address"}],"name":"withrawFundTeacher","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"ETH_TOKEN_ADDRESS","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"listCourse","outputs":[{"name":"price","type":"uint256"},{"name":"teacher","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_courseId","type":"uint256"},{"name":"_price","type":"uint256"}],"name":"addCourse","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_orderId","type":"uint256"},{"name":"src","type":"address"}],"name":"cancelOrder","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_adminAddr","type":"address"}],"name":"transferAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"listOrder","outputs":[{"name":"courseId","type":"uint256"},{"name":"orderTime","type":"uint256"},{"name":"user","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_courseId","type":"uint256"},{"name":"_orderId","type":"uint256"},{"name":"src","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"dest","type":"address"},{"name":"destAddress","type":"address"},{"name":"maxDestAmount","type":"uint256"},{"name":"minConversionRate","type":"uint256"},{"name":"kyberNetworkProxy","type":"address"},{"name":"walletId","type":"address"}],"name":"buyCourse","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"courseId","type":"uint256"},{"indexed":false,"name":"price","type":"uint256"},{"indexed":true,"name":"teacher","type":"address"}],"name":"AddCourse","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"courseId","type":"uint256"},{"indexed":true,"name":"orderId","type":"uint256"},{"indexed":true,"name":"user","type":"address"}],"name":"BuyCourse","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"teacher","type":"address"},{"indexed":false,"name":"priceUnlock","type":"uint256"},{"indexed":true,"name":"orderId","type":"uint256"}],"name":"TeacherWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"teacher","type":"address"},{"indexed":true,"name":"orderId","type":"uint256"},{"indexed":false,"name":"priceUnlock","type":"uint256"}],"name":"StudentCancel","type":"event"}];
    const wrapperContract = "0x3a20339e253f7ab78d51713eb28eac8588ae72eb";
    const ethWrapperContract = new web3.eth.Contract(WRAPPER_ABI, wrapperContract);

    const courseId = 1;
    const orderId = 1;
    const srcToken = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
    const srcAmount = 100000000000000000;
    const dest = "0xad6d458402f60fd3bd25163575031acdce07538d";
    const destAddress = "0x9559034C287A0E73A9a68288Bc27Eb8189427AA1";
    const maxDestAmount = 10000000000000000000;
    const minConversionRate = 575814601000000000000;
    const kyberNetworkProxy = "818e6fecd516ecc3849daf6845e3ec868087b755";
    const commissionId = "0x" + Array(41).join("0");

    window.kyberWidgetInstance.render({
      appId: "kyber-widget",
      wrapper: wrapperContract,
      getPrice: function () {
        return new Promise((resolve) => {
          resolve(10);
        })
      },
      getTxData: function() {
        const data = ethWrapperContract.methods.buyCourse(
          courseId, orderId, srcToken, srcAmount, dest, destAddress,
          maxDestAmount, minConversionRate, kyberNetworkProxy, commissionId
        );

        return new Promise((resolve) => {
          resolve({ value: 0, data, gasLimit: 800000, to: wrapperContract })
        })
      },
      params
    })
  }

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
            </div>
          </div>
          <div></div>
        </div>
      </Layout>
    )
  }
}

export default connect(state => state)(withRouter(Course))
