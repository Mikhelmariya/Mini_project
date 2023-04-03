const { default: mongoose } = require("mongoose");
const userSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  
  const user = mongoose.model("users", userSchema);
  module.exports = user;
  