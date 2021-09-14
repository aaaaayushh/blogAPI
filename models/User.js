var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

var UserSchema = new Schema({
  username: { type: String, required: true, maxlength: 100 },
  password: { type: String, required: true, maxlength: 100 },
  posts: [{type:Schema.Types.ObjectId,ref='Post'}],
});
UserSchema.pre(
  'save',
  async function(next){
    const user = this;
    const hash = await bcrypt.hash(this.password,10);
    this.password = hash;
    next();
  }
)
UserSchema.methods.isValidPassword = async function(password){
  const user = this;
  const compare = await bcrypt.compare(password,user.password);
  return compare;
}
module.exports = mongoose.model("User", UserSchema);
