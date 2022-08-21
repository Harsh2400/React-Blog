const User = require("../../../models/user");
const bcrypt = require("bcrypt");

function signinController() {
  return {
    async login(req, res) {
      try {
        const { userid, password } = req.body;

        if (!userid || !password) {
          return res.json({ error: "All Fields are required" });
        }

        let user = await User.findOne({ userid: userid });

        if (!user) {
          return res.json({ error: "User Not Found" });
        }

        bcrypt
          .compare(password, user.password)
          .then((match) => {
            if (match) {
              req.session.user = user;
              return res.json({
                success: {
                  _id: user._id,
                  userid: user.userid,
                  email: user.email,
                },
              });
            }
            return res.json({ error: "Invalid Credentials" });
          })
          .catch((err) => {
            return res.json({ error: "Something Went Wrong" });
          });
      } catch (error) {
        return res.json({ error: "Something Went Wrong" });
      }
    },
  };
}

module.exports = signinController;
