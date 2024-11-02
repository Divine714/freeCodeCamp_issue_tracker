require("./database_connection.js");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const issueSchema = new Schema ({
    issue_title: { type: String, required: true },
    issue_text : { type: String, required: true },
    created_on : { type: Date, required: true },
    updated_on : Date,
    created_by : { type: String, required: true },
    assigned_to: String,
    open : { type: Boolean, default: true },
    status_text: String,
    project: { type: String, required: true }
}, { versionKey: false });

const issueModel = mongoose.model("Issue", issueSchema);

const projectSchema = new Schema ({

})

const projectModel = mongoose.model("Project", projectSchema);

exports.issueModel = issueModel;
exports.projectModel = projectModel;