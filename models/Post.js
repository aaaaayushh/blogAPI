var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: { type: String, required: true, maxLength: 120 },
  body:{type:String,required:true},
  author:{type:Schema.Types.ObjectId,ref='User'},
  time:{type:Date,required:true,default:Date.now()},
  comments:[{type:Schema.Types.ObjectId,ref='Comment'}],
  published:{type:Boolean,required:true}
});

module.exports = mongoose.model("Post",PostSchema)