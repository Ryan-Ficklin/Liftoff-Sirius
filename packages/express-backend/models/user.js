/* fields that a user should have:
    username (unique? or id field?)
    password?
    tasks associated [TaskID]
    email?
*/

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: false,
      trim: true,
    },
    task_list: {
        type: [ObjectId],
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
  },
  { collection: "users_list" }
);

const User = mongoose.model("User", UserSchema);

export default User;