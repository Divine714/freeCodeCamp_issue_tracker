'use strict';

const issueModel = require("../models").issueModel;
const projectModel = require("../models").projectModel



module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(async (req, res) => {
      let project = req.params.project;
      console.log(project);
      console.log(req.params._id)
      let query = req.query;
      console.log(query);
      if (query) {
        query["project"] = project;
      console.log(req.query)
      const issues = await issueModel.find(query)
      res.json(issues)
      } else {
        const issues = await issueModel.find({ project: project })
      res.json(issues)
      }
      
    })
    
    .post(async (req, res) => {
      let project = req.params.project;
      console.log(req.body._id)

      if (!req.body.issue_title || !req.body.issue_text || !req.body.created_by){
        res.json({ error: 'required field(s) missing' })
        } else {
          const createIssue = new issueModel({
          issue_title: req.body.issue_title,
          issue_text: req.body.issue_text,
          created_on : new Date(),
          updated_on : new Date(),
          created_by : req.body.created_by,
          assigned_to: req.body.assigned_to || "",
          open : true,
          status_text: req.body.status_text || "",
          project: project,
      });
      const saveIssue = await createIssue.save();

      res.json({
        assigned_to: saveIssue.assigned_to,
        status_text: saveIssue.status_text,
        open: saveIssue.open,
        _id: saveIssue._id,
        issue_title: saveIssue.issue_title,
        issue_text: saveIssue.issue_text,
        created_by: saveIssue.created_by,
        created_on: saveIssue.created_on,
        updated_on: saveIssue.updated_on,
      })
        }
      
    })
    
    .put(async (req, res) => {
      let project = req.params.project;
      const filter = req.body._id;
      console.log(filter);
      if(!req.body._id) {
        res.json({ error: 'missing _id' })
      } else {
        let updateIssue = await issueModel.findOne({ _id: filter});
        console.log(updateIssue);
        if(!req.body.issue_text && !req.body.issue_title && !req.body.created_by && 
          !req.body.assigned_to && !req.body.status_text && (!req.body.open || updateIssue.open === false)) {
            res.json({ error: 'no update field(s) sent', _id: req.body._id })
          } else {
            try {
              if (req.body.issue_text) {
                updateIssue.issue_text = req.body.issue_text;
              };
              if (req.body.issue_title) {
                updateIssue.issue_title = req.body.issue_title;
              };
              if (req.body.created_by) {
                updateIssue.created_by = req.body.created_by;
              };
              if (req.body.assigned_to) {
                updateIssue.assigned_to = req.body.assigned_to;
              };
              if (req.body.status_text) {
                updateIssue.status_text = req.body.status_text
              };
              if (req.body.open) {
                updateIssue.open = false;
              };
              updateIssue.updated_on = new Date();
              console.log(updateIssue);
              let saveIssue = await issueModel.findOneAndUpdate( {_id: filter} , updateIssue);
      
              res.json({  result: 'successfully updated', _id: saveIssue._id })
            } catch (error) {
              console.error(error);
              res.json({ error: 'could not update', _id: req.body._id })
            }
            
          }
        }
      
    })

    .delete(async(req, res) => {
      let project = req.params.project;
      if (!req.body._id) {
        res.json({ error: 'missing _id' });
      } else {
        try {
          const checkIssue = await issueModel.findOne({ _id: req.body._id });
          if (checkIssue) {
            const deleteIssue = await issueModel.findOneAndDelete({ _id: req.body._id });
            res.json({ result: 'successfully deleted', _id: req.body._id })
          } else{
            res.json({ error: 'could not delete', _id: req.body._id })
          }
          
        } catch (error) {
        console.error(error);
        res.json({ error: 'could not delete', _id: req.body._id })
          }
        
    
        }
    })

    
};


/*const update = () => {
        if (req.body.issue_text) {
          
        }
      }
      const updateIssue = findOneAndUpdate(filter)
    })*/