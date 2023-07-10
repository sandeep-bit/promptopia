import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  fName: {
    type: String,
  },
  lName: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, 'email already exists'],
    required: [true, 'email is required'],
  },
  username: {
    type: String,
    // match: [
    //   /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
    //   'Username invalid, it should contain 8-20 alphanumeric letters and be unique!',
    // ],
    required: [true, 'username is required'],
  },
  image: { type: String },
});

const User = models.User || model('User', UserSchema);

export default User;
