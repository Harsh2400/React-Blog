const User = require("../../../models/user");
const bcrypt = require("bcrypt");

function signupController() {
  return {
    async register(req, res) {
      try {
        const { userid, email, password } = req.body;

        if (!userid || !email || !password) {
          return res.json({ error: "All Fields are required" });
        }

        if (!/^[a-z][a-z0-9_]*$/.test(userid)) {
          return res.json({
            error: "User ID does not match the requested format",
          });
        }

        const idExists = await User.exists({ userid: userid });
        if (idExists) {
          return res.json({ error: "User Id already taken" });
        }

        const emailExists = await User.exists({ email: email });
        if (emailExists) {
          return res.json({ error: "Email already taken" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          userid,
          email,
          password: hashedPassword,
        });
        user.save().then((user) => {
          console.log("New user saved ");
          return res.json({ success: true });
        });
      } catch (error) {
        return res.json({ error: "Something Went Wrong" });
      }
    },
  };
}

module.exports = signupController;
