const mongoose = require("mongoose");
const bcryp = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

userSchema.pre("save", async function(next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

userSchema.methods.isValidated = async function(password) {
  const user = this;
  const compare = await bcryp.compare(password, user.password);
  return compare;
};

/*

userSchema.methods.encryptPassword = (password) => bcryp.hashSync(password, bcryp.genSaltSync(10));

userSchema.methods.comparePassword = (password) => bcryp.compareSync(password, this.password);
*/
module.exports = mongoose.model("user", userSchema);
