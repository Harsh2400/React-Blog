const Article = require("../../models/article");
const Draft = require("../../models/draft");

function profileController() {
  return {
    async index(req, res) {
      try {
        const data = await Article.find(
          {
            creator: String(req.body.id),
          },
          null,
          { sort: { createdAt: -1 } }
        );
        return res.json({ success: data });
      } catch (error) {
        return res.json({ error: "Could not get data" });
      }
    },
    async draft(req, res) {
      try {
        const data = await Draft.find(
          {
            creator: String(req.body.id),
          },
          null,
          { sort: { createdAt: -1 } }
        );
        return res.json({ success: data });
      } catch (error) {
        return res.json({ error: "Could not get data" });
      }
    },
    async draftupload(req, res) {
      try {
        const { title, description, image, _id, userid } = req.body;
        if (!title || !description || !image) {
          return res.json({ error: "All fields are required" });
        }
        const article = new Article({
          creator: req.body.userid,
          title,
          description,
          image,
        });
        article
          .save()
          .then((article) => {
            console.log("Posted");
            // return res.json({ success: true });
          })
          .catch((error) => {
            //console.log(error);
            return res.json({ error: "Could not upload" });
          });
        const remove = await Draft.findByIdAndRemove({ _id: _id });
        if (remove) {
          return res.json({ success: true });
        }
      } catch (error) {
        console.log(error);
        return res.json({ error: "Something went wrong" });
      }
    },
    async deletedraft(req, res) {
      try {
        const remove = await Draft.findByIdAndRemove({ _id: req.body._id });
        if (remove) {
          return res.json({ success: true });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async update(req, res) {
      try {
        let values = {
          title: req.body.title,
          description: req.body.description,
        };
        Article.updateOne({ _id: req.body._id }, values, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("saved");
            return res.json({ success: true });
          }
        });
      } catch (error) {
        console.log(error);
      }
    },

    async delete(req, res) {
      try {
        const remove = await Article.findByIdAndRemove({ _id: req.body._id });
        if (remove) {
          return res.json({ success: true });
        }
      } catch (error) {
        console.log(error);
      }
    },
  };
}

module.exports = profileController;
