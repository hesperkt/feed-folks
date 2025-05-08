module.exports = {
  ensureAuth: function (req, res, next) { //next argument is a variable that represents the controller; function that checks if the user is authenticated and if so it calls the controller
    if (req.isAuthenticated()) {
      return next() //if user is authenticated call the next() function (a.k.a next controller)
    } else {
      res.redirect("/");
    }
  },
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/dashboard");
    }
  },
};
