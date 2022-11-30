const User = require("../model/User");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required. " });
  } // verify username and password in request
  const foundUser = await User.findOne({ username: user }).exec(); // search for user in DB
  if (!foundUser) return res.sendStatus(401);
  const match = await bcrypt.compare(pwd, foundUser.password); // verify passsword
  if (match) {
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    ); //create Access Token
    const refreshToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    ); //create Refresh Token
    foundUser.refreshToken = refreshToken; //add Refresh Token to user
    const result = await foundUser.save(); // save refresh token into DB
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    }); //create cookie for refresh token
    res.json({ accessToken }); //spit out access token for local storage
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
