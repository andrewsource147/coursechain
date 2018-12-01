import { withRouter } from 'next/router'
import Layout from '../app/components/Layout'
import AskQuestion from '../app/components/AskQuestion'
import Modal from '../app/components/Modal'
import {Component} from 'react'
import {connect} from 'react-redux'
import { questionActionTypes, voteQuestion } from '../app/actions/questionActions'
import { answerActionTypes, voteAnswer } from "../app/actions/answerActions";
import { voteUser } from "../app/actions/userActions";
import jdenticon from 'jdenticon';

class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionId: props.router.query.id,
      answerForm: {
        content: null
      },
      isModalActive: false
    }
  }

  componentDidMount = () => {
    jdenticon();
    this.props.dispatch({ type: questionActionTypes.FETCH_QUESTION, payload: this.state.questionId });
  }

  onVoteQuestion(questionId, isUpvote, user) {
    this.props.dispatch(voteQuestion(questionId, user, isUpvote))
    this.props.dispatch(voteUser(user, isUpvote))
  }

  onVoteAnswer(answerId, isUpvote, user) {
    this.props.dispatch(voteAnswer(answerId, user, isUpvote))
    this.props.dispatch(voteUser(user, isUpvote))
  }

  getListTxs = () =>{
    var listTxs = this.props.user.txs.map((txsHash, i) => {
      return <div className={"modal-tx__item"} key={txsHash}>
        <span>{i + 1}. </span>
        <a href={"https://ropsten.etherscan.io/tx/" + txsHash} target="_blank">{txsHash}</a>
      </div>
    })
    return listTxs
  }

  handleOpenModal = () => {
    this.setState({isModalActive: true});
  }

  handleCloseModal = () => {
    this.setState({isModalActive: false});
  }

  handleCloseTxModal = () => {
    this.props.dispatch({ type: 'USER.HANDLE_TX_MODAL', payload: false });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      answerForm: {
        ...this.state.answerForm,
        [name]: value
      }
    });
  }

  handleSubmitAnswer = () => {
    const content = this.state.answerForm.content;
    const address = this.props.common.user.address;

    if (!content) {
      return;
    }

    this.props.dispatch({type: answerActionTypes.SUBMIT_ANSWER, payload: {
      questionId: this.state.questionId,
      content,
      address
    }});
  }

  getShortAddr = (address) => {
    let result = address.slice(0, 8) + "..." + address.slice(-6)
    let link = "https://ropsten.etherscan.io/address/" + address
    return (
      <a href={link} target="_blank">
        {result}
      </a>
    )
  }

  render() {
    const question = this.props.question.selectedQuestion;
    const answers = this.props.answer.answers;

    return (
      <Layout dispatch={this.props.dispatch} path={this.props.router.pathname}>
        {question && (
          <div className={"question"}>
            {/*=================== Question Container ===================*/}
            <div className={"question__question-container"}>
              <div className={"question__header"}>
                <div className={"question__title"}>{question.title}</div>
                <div className={"common__ask-question"} onClick={this.handleOpenModal}>Ask Question</div>
              </div>

              <div className={"question__item-container"}>
                <div className={"question__item"}>
                  <div className={"question__item-info"}>
                    <div className="question__item-avatar">
                      <canvas data-jdenticon-value={question.address} width="50" height="50"/>
                    </div>
                    <div className={"question__item-vote"}>
                      <span>{question.votes}</span>
                      <div className={"question__item-up"} onClick={() => this.onVoteQuestion(question.id, 1, question.address)}/>
                      <div className={"question__item-fav"}/>
                    </div>
                  </div>

                  <div className={"question__item-content"}>
                    <div className={"question__item-header"}>
                      <div className={""}>
                        <div className={"question__item-name"}>{question.address ? this.getShortAddr(question.address) : question.id}</div>
                      </div>

                      <div className={"question__item-metadata-container"}>
                        <div className={"question__item-metadata"}>
                          <div className={"question__item-metadata--light"}>asked:</div>
                          <div className={"question__item-metadata--bold"}>today</div>
                        </div>
                        <div className={"question__item-metadata"}>
                          <div className={"question__item-metadata--light"}>viewed:</div>
                          <div className={"question__item-metadata--bold"}>12 times</div>
                        </div>
                        <div className={"question__item-metadata"}>
                          <div className={"question__item-metadata--light"}>active:</div>
                          <div className={"question__item-metadata--bold"}>today</div>
                        </div>
                      </div>
                    </div>

                    <div className={"question__item-body"} dangerouslySetInnerHTML={{__html: question.content}}/>
                  </div>
                </div>
              </div>
            </div>

            {/*=================== Answer Container ===================*/}
            {answers.length > 0 && (
              <div className={"question__answer-container"}>
                <div className={"question__answer-header"}>
                  <div>{answers.length} Answers</div>
                  <div className={"common__sort"}>
                    <div className={"common__sort-item active"}>Active</div>
                    <div className={"common__sort-item"}>Oldest</div>
                    <div className={"common__sort-item"}>Votes</div>
                  </div>
                </div>

                <div className={"question__item-container"}>

                  {answers.map((answer, i) => (
                    <div className={"question__item question__item--answer"} key={i}>
                      <div className={"question__item-info"}>
                        <canvas data-jdenticon-value={`${answer.address}`} width="55" height="55" className="question__item-avatar"/>
                        <div className={"question__item-vote"}>
                          <span>{answer.votes}</span>
                          <div className={"question__item-up"} onClick={() => this.onVoteAnswer(answer.id, 1, answer.address)}/>
                          <div className={"question__item-fav"}/>
                        </div>
                      </div>

                      <div className={"question__item-content"}>
                        <div className={"question__item-header"}>
                          <div className={""}>
                            <div className={"question__item-name"}>{answer.address ? this.getShortAddr(answer.address) : answer.id}</div>
                          </div>
                        </div>

                        <div className={"question__item-body"} dangerouslySetInnerHTML={{__html: answer.content}}/>
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            )}

            {/*=================== Post Answer ===================*/}
            <div className={"question__answer-container"}>
              <div className={"question__answer-header question__answer-header--bot"}>
                <div>Your Answer</div>
              </div>

              <form>
                <textarea className={"common__input common__textarea"} name={"content"} onChange={this.handleInputChange}/>
                <div className={"common__button question__answer-submit"} onClick={this.handleSubmitAnswer}>Post Your Answer</div>
              </form>
            </div>
          </div>
        )}

        <AskQuestion isModalActive={this.state.isModalActive} handleCloseModal={this.handleCloseModal}/>

        <Modal isActive={this.props.user.isTxModalActive} handleClose={this.handleCloseTxModal}>
          <div className={"modal-tx"}>
            <h3 className={"modal-tx__title"}>Your transactions</h3>
            <div className={"modal-tx__container"}>
              {this.getListTxs()}
            </div>
          </div>
        </Modal>
      </Layout>
    )
  }
}

export default connect(state => state)(withRouter(Question))


