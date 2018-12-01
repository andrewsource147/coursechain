var fs = require('fs')
var express = require('express');

var cors = require('cors')
var app = express()
app.use(cors())
app.options('*', cors());
var bodyParser = require('body-parser')

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


var isInit = process.env.npm_config_init || process.env.init
console.log(isInit)


/**************** SET LOG FILE */
var fileLog = __dirname + "/error.log"
const manager = require('simple-node-logger').createLogManager();
manager.createFileAppender( { logFilePath:fileLog } );
const log = manager.createLogger( 'errorLog', 'info' );
if (!fs.existsSync(fileLog)){
  fs.writeFile(fileLog, '', function(){console.log('done created log file')})
}else{
  if(isInit){
    //clear error log
    fs.writeFile(fileLog, '', function(){console.log('done clear log file')})
  }
}
process.on('uncaughtException', function (err) {
  log.info(err, ' accepted at ', new Date().toJSON());
  console.log("uncaughtException")
});
/**END INIT */


/******************** INIT DATABASE ***************/
var PersistClass = require("./persist/sqlite/sqlitePersist")
var persistor = new PersistClass()
//clear database
if (isInit) {
  persistor.destroyStore(() => {
    persistor.initStore()
  })
} else {
  persistor.initStore()
}
/**END INIT DATABASE */


// function main() {
//   var EthereumService = require("./eth/ethereum")
//   var connectionInstance = new EthereumService(
//     {
//       default: 'http', persistor: persistor,
//     })
//   connectionInstance.subcribe()
// }

// main()






/****************** HTTP SERVER */
app.post('/submit/question', function (req, res) {
    const {title, content, address} = req.body
    //console.log(req.body)
    var event = persistor.submitQuestion(title, content, address)
    event.then((result) => {      
      res.end(JSON.stringify(result))
    }).catch(err => {
      res.end(JSON.stringify(err))
    })
  });

  app.post('/submit/answer', function (req, res) {
    const {question_id, content, address} = req.body
    var event = persistor.submitAnswer(question_id, content, address)
    event.then((result) => {      
      res.end(JSON.stringify(result))
    }).catch(err => {
      res.end(JSON.stringify(err))
    })
  });
  
  
  app.post('/vote/question', function (req, res) {
    const {question_id, address, is_upvotes} = req.body
    var event = persistor.voteQuestion(question_id, address, is_upvotes)
    event.then((result) => {      
      res.end(JSON.stringify(result))
    }).catch(err => {
      res.end(JSON.stringify(err))
    })
  })
  
  app.post('/vote/answer', function (req, res) {
    const {answer_id, address, is_upvotes} = req.body
    var event = persistor.voteAnswer(answer_id, address, is_upvotes)
    event.then((result) => {      
      res.end(JSON.stringify(result))
    }).catch(err => {
      res.end(JSON.stringify(err))
    })
  })
  
  
  app.get('/questions', function (req, res) {
    var event = persistor.getQuestions()
    event.then((result) => {      
      console.log(result)
      res.end(JSON.stringify(result))
    }).catch(err => {
      console.log(err)
      res.end(JSON.stringify(err))
    })
  })
  
  
  app.get('/question/:question_id', function (req, res) {
    var question_id  = req.params.question_id
    var event = persistor.getQuestion(question_id)
    event.then((result) => {      
      res.end(JSON.stringify(result))
    }).catch(err => {
      res.end(JSON.stringify(err))
    })
  })
  
  var port = process.env.npm_config_port ? process.env.npm_config_port : 3001
  app.listen(port, '0.0.0.0')
  console.log('Listening at http://0.0.0.0:' + port)