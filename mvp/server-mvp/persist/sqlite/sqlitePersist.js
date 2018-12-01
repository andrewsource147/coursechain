const sqlite3 = require('sqlite3').verbose()

var fs = require('fs')
var path = require('path')



var filePath



var dir = __dirname + '/stores'

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

filePath = path.join(__dirname, '/stores/stackchain.db')



class SqlitePersist {
  constructor() {
    //.this.initArraySupportedTokenAddress()
    this.initStore()
  }

  destroyStore(cb) {
    fs.unlink(filePath, (err, result) => {
      console.log("Clear old file")
      cb()
    })
  }

  initStore() {
    if (!fs.existsSync(filePath)) {
      var _this = this
      this.db = new sqlite3.Database(filePath)
      this.db.serialize(function () {
        _this.initQuestionTable()
        _this.initAnswerTable()
      })
      console.log("Done init table")
    } else {
      this.db = new sqlite3.Database(filePath)
    }

  }

  initQuestionTable() {
    this.db.run("CREATE TABLE tbl_question (id INTEGER PRIMARY KEY, title STRING, content STRING, votes INT, address STRING, timestamp INT)");
  }
  initAnswerTable() {
    this.db.run("CREATE TABLE tbl_answer (id INTEGER PRIMARY KEY, question INT, content STRING, votes INT, address STRING, timestamp INT)");
  }

  submitQuestion(title, content, address) {
    return new Promise((resolve, reject) => {
      var timestamp = Math.floor((new Date).getTime() / 1000)
      var stmt = this.db.prepare("INSERT INTO tbl_question(title, content, address, votes, timestamp) VALUES (?,?,?,?,?)")
      stmt.run(title, content, address, 0, timestamp);
      stmt.finalize()

      resolve({ status: "success" })
      console.log("Question is inserted");
    })
  }

  submitAnswer(question_id, content, address) {
    return new Promise((resolve, reject) => {
      var timestamp = Math.floor((new Date).getTime() / 1000)
      var stmt = this.db.prepare("INSERT INTO tbl_answer(question, content, address, votes, timestamp) VALUES (?,?,?,?,?)")
      stmt.run(question_id, content, address, 0, timestamp);
      stmt.finalize()

      resolve({ status: "success" })
      console.log("Answer is inserted");
    })
  }


  voteQuestion(question_id, address, is_upvotes) {
    var sql = `SELECT votes FROM tbl_question WHERE id  = ?`;
    return new Promise((resolve, reject) => {
      this.db.get(sql, [question_id], (err, row) => {
        if (err) {
          console.log(err)
          reject({ status: "fail", reason: err.message })
        } else {
          var votes = row.votes
          if (is_upvotes == 1) {
            votes += 1
          } else {
            votes -= 1
          }

          var sql = `UPDATE tbl_question SET votes = ? WHERE id = ?`
          this.db.run(sql, [votes, question_id], function (err) {
            if (err) {
              console.log(err)
              reject({ status: "fail", reason: err.message })
            } else {
              resolve({ status: "success" })
              console.log(`votes updated: ${votes}`)
            }
          })
        }
      })
    })
  }

  voteAnswer(answer_id, address, is_upvotes) {
    var sql = `SELECT votes FROM tbl_answer WHERE id  = ?`;
    return new Promise((resolve, reject) => {
      this.db.get(sql, [answer_id], (err, row) => {
        if (err) {
          console.log(err)
          reject({ status: "fail", reason: err.message })
        } else {
          var votes = row.votes
          if (is_upvotes == 1) {
            votes += 1
          } else {
            votes -= 1
          }

          var sql = `UPDATE tbl_answer SET votes = ? WHERE id = ?`
          this.db.run(sql, [votes, answer_id], function (err) {
            if (err) {
              console.log(err)
              reject({ status: "fail", reason: err.message })
            } else {
              resolve({ status: "success" })
              console.log(`votes updated: ${votes}`)
            }
          })
        }
      })
    })
  }


  getQuestions() {
    return new Promise((resolve, reject) => {
      var sql = "SELECT * FROM tbl_question"
      this.db.all(sql, [], function (err, row) {
        if (err) {
          console.log(err)
          reject({ status: "fail", reason: err.message })
        } else {
          resolve({ status: "success", data: row })
        }
      })
    })
  }

  getQuestion(question_id) {
    var _this = this
    return new Promise((resolve, reject) => {
      var sql = "SELECT * FROM tbl_question where id = ?"
      this.db.get(sql, [question_id], function (err, row) {
        if (err) {
          console.log(err)
          reject({ status: "fail", reason: err.message })
        } else {
          var question = row
          var sql_awnser = "SELECT * FROM tbl_answer where question = ?"
          _this.db.all(sql_awnser, [question_id], function (err, rowAnswer) {
            if (err) {
              console.log(err)
              reject({ status: "fail", reason: err.message })
            }
            else {
              var answer = rowAnswer
              resolve({ status: "success", data: { question, answer } })
            }
          })
        }
      })
    })
  }
}


module.exports = SqlitePersist