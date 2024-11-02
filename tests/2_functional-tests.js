const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test("Create with every field", function(done) {
    chai
        .request(server)
        .post('/api/issues/test')
        .send({
            issue_title: 'one',
            issue_text: 'two',
            created_by: 'three',
            assigned_to: 'four',
            status_text: 'five'
        })
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.issue_title, "one");
            assert.equal(res.body.issue_text, "two")
            assert.equal(res.body.created_by, "three")
            assert.equal(res.body.assigned_to, "four")
            assert.equal(res.body.status_text, "five")
         done();
         });
   });

   test("Create with only required fields", function(done) {
    chai
        .request(server)
        .post('/api/issues/test')
        .send({
            issue_title: 'one',
            issue_text: 'two',
            created_by: 'three',

        })
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.issue_title, "one");
            assert.equal(res.body.issue_text, "two")
            assert.equal(res.body.created_by, "three")
            assert.equal(res.body.assigned_to, "")
            assert.equal(res.body.status_text, "")
         done();
         });
   });

   test("Create with missing required fields", function(done) {
    chai
        .request(server)
        .post('/api/issues/test')
        .send({
            issue_title: 'one',

        })
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "required field(s) missing")
         done();
         });
   });

   test("get request", function(done) {
    chai
        .request(server)
        .get('/api/issues/test')
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isArray(res.body)
         done();
         });
   });

   test("get request with 1 filter", function(done) {
    chai
        .request(server)
        .get('/api/issues/test')
        .query({ issue_title: "one"})
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isArray(res.body)
            assert.equal(res.body[0].issue_title, "one")
         done();
         });
   });

   test("get request with 2 filters", function(done) {
    chai
        .request(server)
        .get('/api/issues/test')
        .query({ issue_title: "one",
            issue_text: "two"
        })
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isArray(res.body)
            assert.equal(res.body[0].issue_title, "one")
            assert.equal(res.body[0].issue_text, "two")
         done();
         });
   });

   test("put request one field", function(done) {
    chai
        .request(server)
        .put('/api/issues/test')
        .send({ _id: "6725bfe383770b95792ca193",
            issue_text: "2"
        })
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.result, "successfully updated")
         done();
         });
   });

   test("put request two fields", function(done) {
    chai
        .request(server)
        .put('/api/issues/test')
        .send({ _id: "6725bfe383770b95792ca193",
            issue_text: "2",
            created_by: "3"
        })
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.result, "successfully updated")
         done();
         });
   });

   test("put request with missing id", function(done) {
    chai
        .request(server)
        .put('/api/issues/test')
        .send({
            issue_text: "2",
            created_by: "3"
        })
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "missing _id")
         done();
         });
   });

   test("put request with no fields to update", function(done) {
    chai
        .request(server)
        .put('/api/issues/test')
        .send({
            _id: "6725bfe383770b95792ca193"
        })
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "no update field(s) sent")
         done();
         });
   });

   test("put request incorrect id", function(done) {
    chai
        .request(server)
        .put('/api/issues/test')
        .send({ _id: "6725bfe383770b95792ca191",
            issue_text: "2",
            created_by: "3"
        })
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "could not update")
         done();
         });
   });

   test("delete request", function(done) {
    chai
        .request(server)
        .delete('/api/issues/test')
        .send({ _id: "6725c18baf4b9f2f9581eedc"
        })
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.result, "successfully deleted")
         done();
         });
   });

   test("delete request with invalid id", function(done) {
    chai
        .request(server)
        .delete('/api/issues/test')
        .send({ _id: "6725c18baf4b9f2f9581eedr"
        })
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "could not delete")
         done();
         });
   });

   test("delete request with invalid id", function(done) {
    chai
        .request(server)
        .delete('/api/issues/test')
        .send({ issue_title: "one"
        })
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "missing _id")
         done();
         });
   });
});
