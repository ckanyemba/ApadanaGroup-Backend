const express = require("express");
const { Article } = require("../models/article");
const { isAdmin } = require("../middleware/auth");
const cloudinary = require("../utils/cloudinary");

const router = express.Router();

// CREATE ARTICLE
router.post("/", isAdmin, async (req, res) => {
  const { name, type, content, desc, image } = req.body;

  try {
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "apadana-group",
      });

      if (uploadRes) {
        const article = new Article({
          name,
          type,
          content,
          desc,
          image: uploadRes,
        });

        const savedArticle = await article.save();
        res.status(200).send(savedArticle);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// GET ALL ARTICLES
router.get("/", async (req, res) => {
  const qtype = req.query.type;
  try {
    let articles;

    if (qtype) {
      articles = await Article.find({ type: qtype });
    } else {
      articles = await Article.find();
    }

    res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching articles.");
  }
});

// GET ARTICLES

router.get("/find/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.status(200).send(article);
  } catch (error) {
    res.status(500).send(error);
  }
});

//DELETE ARTICLE

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.status(200).send("Article has been deleted...");
  } catch (error) {
    res.status(500).send(error);
  }
});

// EDIT ARTICLE by ID
router.put("/:id", isAdmin, async (req, res) => {
  if (req.body.articleImg) {
    const destroyResponse = await cloudinary.uploader.destroy(
      req.body.article.image.public_id,
    );

    if(destroyResponse) {
      const uploadedResponse = await cloudinary.uploader.upload(
        req.body.articleImg,
        {
          upload_preset: "apadana-group",
        }
      );

      if(uploadedResponse)
      {
        const updatedArticle = await Article.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              ... req.body.article,
              image: uploadedResponse,
           },
          },
          { new: true }
        );

        res.status(200).send(updatedArticle);
      }
    }
  } else {
    try {
      const updatedArticle = await Article.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body.article,
        },
        {
          new: true
        }
      );
      res.status(200).send(updatedArticle);
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

// UPDATE ARTICLE

router.put("/:id", isAdmin, async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedArticle);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
