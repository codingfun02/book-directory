import bcrypt from "bcrypt";
import User from "../models/User";

export const getJoin = (req, res) => {
  const { loggedIn } = req.session;
  if (loggedIn) {
    req.flash("Please LOGIN to join!");
    return res.status(401).redirect("/");
  }
  return res.render("users/join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const { username, password, passwordConfirm } = req.body;
  const usernameExists = await User.exists({ username });
  const { loggedIn } = req.session;
  if (loggedIn) {
    req.flash("Please LOGOUT to join!");
    return res.status(401).redirect("/");
  }
  if (usernameExists) {
    req.flash("error", "Username alreay exists");
    return res.status(409).redirect("/join");
  }
  if (password != passwordConfirm) {
    req.flash("error", "Confirm password doesn't match");
    return res.status(409).redirect("/join");
  }
  try {
    await User.create({
      username,
      password,
    });
  } catch (error) {
    req.flash("error", "Error occured while creating user: " + error._message);
    return res.status(500).redirect("/login");
  }
  res.redirect("/login");
};

export const getLogin = (req, res) => {
  const { loggedIn } = req.session;
  if (loggedIn) {
    req.flash("Please LOGOUT to login!");
    return res.status(401).redirect("/");
  }
  return res.render("users/login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const { loggedIn } = req.session;
  if (loggedIn) {
    req.flash("Please LOGOUT to login!");
    return res.status(401).redirect("/");
  }
  if (!user) {
    req.flash("error", "Account doens't exist");
    return res.status(400).redirect("/login");
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    req.flash("error", "Password isn't correct");
    return res.status(400).redirect("/login");
  }
  req.session.loggedIn = true;
  req.session.loggedInUser = user;
  return res.redirect("/");
};

export const logout = (req, res) => {
  const { loggedIn } = req.session;
  if (!loggedIn) {
    req.flash("Please LOGIN to logout!");
    return res.status(401).redirect("/");
  }
  req.session.loggedIn = false;
  req.session.loggedInUser = {};
  req.flash("success", "Successfully Logged out");
  return res.redirect("/");
};


export const seeUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate({
    path: "books",
    populate: {
      path: "owner"
    }
  });
  return res.render("users/see-user.pug", { pageTitle: `${user.username}'s Profile`, user });
};