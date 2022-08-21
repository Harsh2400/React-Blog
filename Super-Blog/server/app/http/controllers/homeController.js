function homeController() {
  return {
    index(req, res) {
      res.send("home");
    },
  };
}

module.exports = homeController;
