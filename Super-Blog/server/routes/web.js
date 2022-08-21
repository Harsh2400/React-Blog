const homeController = require("../app/http/controllers/homeController");
const signupController = require("../app/http/controllers/auth/signupController");
const signinController = require("../app/http/controllers/auth/signinController");
const articleController = require("../app/http/controllers/articleController");
const profileController = require("../app/http/controllers/profileController");

//middleware
const auth = require("../app/http/middlewares/auth");
function initRoutes(app) {
  //home
  app.get("/", homeController().index);

  app.post("/register", signupController().register);
  app.post("/login", signinController().login);

  app.post("/upload", articleController().upload);
  app.post("/draft", articleController().draft);
  app.post("/schedule", articleController().schedule);

  app.get("/article", articleController().article);
  app.post("/comment", articleController().comment);

  app.post("/myarticle", profileController().index);
  app.post("/update", profileController().update);
  app.post("/delete", profileController().delete);

  app.post("/mydraft", profileController().draft);
  app.post("/draftupload", profileController().draftupload);
  app.post("/deletedraft", profileController().deletedraft);
}

module.exports = initRoutes;
