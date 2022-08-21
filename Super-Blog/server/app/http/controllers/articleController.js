const Article = require("../../models/article");
const Draft = require("../../models/draft");

function articleController() {
  return {
    async article(req, res) {
      const data = await Article.find({}, null, {
        sort: { createdAt: -1 },
      }).populate("creator", "-password -email -_id");
      return res.json({ article: data });
    },
    async comment(req, res) {
      try {
        let { _id, name, comment } = req.body;
        console.log(name);
        if (name === null) {
          name = "guest";
        }
        if (comment === "") {
          return res.json({ error: "Empty comment" });
        }
        let values = {
          $push: {
            comments: [{ name: name, comment: comment }],
          },
        };
        Article.updateOne({ _id: _id }, values, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("saved");
            return res.json({ success: true });
          }
        });
      } catch (error) {
        return res.json({ error: "Something Went wrong" });
      }
    },
    schedule(req, res) {
      try {
        //console.log(req.body._id);
        const { title, description, image, minute } = req.body;
        if (!title || !description || !image) {
          return res.json({ error: "All fields are required" });
        }
        const taksID = setTimeout(() => {
          const article = new Article({
            creator: req.body._id,
            title,
            description,
            image,
          });
          article
            .save()
            .then((article) => {
              console.log("Posted with Schedule");
            })
            .catch((error) => {
              //console.log(error);
            });
        }, minute * 60 * 1000);
        return res.json({ success: true });
      } catch (error) {
        console.log(error);
        return res.json({ error: "Something went wrong" });
      }
    },
    upload(req, res) {
      try {
        //console.log(req.body._id);
        const { title, description, image } = req.body;
        if (!title || !description || !image) {
          return res.json({ error: "All fields are required" });
        }
        const article = new Article({
          creator: req.body._id,
          title,
          description,
          image,
        });
        article
          .save()
          .then((article) => {
            return res.json({ success: true });
          })
          .catch((error) => {
            //console.log(error);
            return res.json({ error: "Could not upload" });
          });
      } catch (error) {
        console.log(error);
        return res.json({ error: "Something went wrong" });
      }
    },
    draft(req, res) {
      try {
        //console.log(req.body._id);
        const { title, description, image } = req.body;
        if (!title || !description || !image) {
          return res.json({ error: "All fields are required" });
        }
        const draft = new Draft({
          creator: req.body._id,
          title,
          description,
          image,
        });
        draft
          .save()
          .then((article) => {
            return res.json({ success: true });
          })
          .catch((error) => {
            //console.log(error);
            return res.json({ error: "Could not upload" });
          });
      } catch (error) {
        console.log(error);
        return res.json({ error: "Something went wrong" });
      }
    },
  };
}

module.exports = articleController;
