const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { firstName, lastName, user, email, confirmEmail, pwd, confirmPwd } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !user ||
    !email ||
    !confirmEmail ||
    !pwd ||
    !confirmPwd
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (pwd !== confirmPwd) {
    return res
      .status(400)
      .json({ message: "Password and confirm password are not identical." });
  }
  if (email !== confirmEmail) {
    return res
      .status(400)
      .json({ message: "Email and confirm email are not identical." });
  }
  // ^^ Make sure request is valid

  const duplicate = await User.findOne({ username: user }).exec();

  if (duplicate) return res.sendStatus(409); // Conflict if username already there

  const emailDuplicate = await User.findOne({ email: email }).exec();

  if (emailDuplicate) return res.sendStatus(409);

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const result = await User.create({
      firstName: firstName,
      lastName: lastName,
      username: user,
      password: hashedPwd,
      email: email,
    });
    console.log(result);

    res.status(201).json({ success: `New user ${user} has been created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
