import { User } from "../model/UserModel.js";
import jwt from "jsonwebtoken";
const { sign } = jwt;

//token function
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
export const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signIn(email, password);

    //create token
    const token = createToken(user._id);

    return res.status(200).json({ email, password, user, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

// signup user
export const SignupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signUp(email, password);

    //create token
    const token = createToken(user._id);

    return res.status(200).json({ email, password, user, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};
