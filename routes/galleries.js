const express = require("express");
const { Gallery } = require("../models/gallery");
const { isAdmin } = require("../middleware/auth");
const cloudinary = require("../utils/cloudinary");

const router = express.Router();
//CREATE
router.post("/", isAdmin, async (req, res) => {
  const { name, brand, desc, price, image } = req.body;

  try {
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "apadana-group",
      });

      if (uploadRes) {
        const gallery = new Gallery ({
          name,
          brand,
          desc,
          price,
          image: uploadRes,
        });

        const savedGallery = await gallery.save();
        res.status(200).send(savedGallery);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// GET ALL Gallery
router.get("/", async (req, res) => {
  const qbrand = req.query.brand;
  try {
    let galleries;

    if (qbrand) {
      galleries = await Gallery.find({ brand: qbrand });
    } else {
      galleries = await Gallery.find();
    }

    res.status(200).json(galleries);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching gallery.");
  }
});

// GET Gallery

router.get("/find/:id", async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    res.status(200).send(gallery);
  } catch (error) {
    res.status(500).send(error);
  }
});

//DELETE

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.status(200).send("Gallery has been deleted...");
  } catch (error) {
    res.status(500).send(error);
  }
});

// EDIT a gallery by ID
router.put("/:id", isAdmin, async (req, res) => {
  if (req.body.galleryImg) {
    const destroyResponse = await cloudinary.uploader.destroy(
      req.body.gallery.image.public_id,
    );

    if(destroyResponse) {
      const uploadedResponse = await cloudinary.uploader.upload(
        req.body.galleryImg,
        {
          upload_preset: "apadana-group",
        }
      );

      if(uploadedResponse)
      {
        const updatedGallery = await Gallery.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              ... req.body.gallery,
              image: uploadedResponse,
           },
          },
          { new: true }
        );

        res.status(200).send(updatedGallery);
      }
    }
  } else {
    try {
      const updatedGallery = await Gallery.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body.gallery,
        },
        {
          new: true
        }
      );
      res.status(200).send(updatedGallery);
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

// UPDATE

router.put("/:id", isAdmin, async (req, res) => {
  try {
    const updatedGallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedGallery);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
