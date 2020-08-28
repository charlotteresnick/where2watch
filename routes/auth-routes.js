const express = require("express");
const authRouter = express.Router();
const passport = require("../services/auth/local");
const authHelpers = require("../services/auth/auth-helpers");
const usersController = require("../controllers/users-controller");
const insertIntoUsersServices = require("../services/insertIntoUserServices").insert();

authRouter.post("/register", usersController.create);
// , insertIntoUsersServices add this when we have services running
authRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/home",
    failureFlash: true,
  })
);

authRouter.get("/verify", (req, res) => {
  if (req.user)
    return res.status(200).json({
      message: "ok",
      auth: true,
      data: {
        user: req.user,
      },
    });
  else
    return res.status(400).json({
      message: "Retry Login",
      auth: false,
      data: {
        user: null,
      },
    });
});

authRouter.get("/logout", (req, res) => {
  req.logout();
  res.json({
    message: "logged out",
    auth: false,
    data: {
      user: null,
    },
  });
});

module.exports = authRouter;