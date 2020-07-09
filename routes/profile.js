const express = require("express");
const router = express.Router();
const authCheck = require("../middlewares/authCheck");
const Profile = require("../models/Profile");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

// @route       GET api/profile/current
// @desc        get current user profile
// @access      Private
router.get("/current", authCheck, async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      userId: req.userId,
    }).populate("userId", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "No profile for the current user" });
    }

    res.status(200).json({
      msg: "Profile for the current user fetched susccefuly ",
      profile: profile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("server error : profile");
  }
});

// @route       POST api/profile
// @desc        Create new profile
// @access      Private
router.post(
  "/",
  [
    authCheck,
    [
      body("skills", "you must fill skills").not().isEmpty(),
      body("status", "Status is required").not().isEmpty(),
    ],
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ validationErrors: errors.array() });
    }

    const profileData = {};
    profileData.userId = req.userId;
    console.log(profileData.userId);
    if (req.body.company) profileData.company = req.body.company;
    if (req.body.bio) profileData.bio = req.body.bio;
    if (req.body.website) profileData.website = req.body.website;
    if (req.body.skills) {
      profileData.skills = req.body.skills
        .split(",")
        .map((skill) => skill.trim());
    }
    if (req.body.github) profileData.github = req.body.github;
    if (req.body.status) profileData.status = req.body.status;

    profileData.socialMedia = {};
    if (req.body.youtube) profileData.socialMedia.youtube = req.body.youtube;
    if (req.body.twitter) profileData.socialMedia.twitter = req.body.twitter;
    if (req.body.facebook) profileData.socialMedia.facebook = req.body.facebook;
    if (req.body.linkedin) profileData.socialMedia.linkedin = req.body.linkedin;
    if (req.body.instagram)
      profileData.socialMedia.instagram = req.body.instagram;

    Profile.findOne({ userId: profileData.userId }).then((selectedProfile) => {
      if (selectedProfile) {
        //update profile
        Profile.findOneAndUpdate(
          { userId: profileData.userId },
          { $set: profileData },
          { new: true },
          (err, updatedProfile) => {
            if (err) {
              res.status(500).json({
                msg: "error occurred while trying to update profile",
                error: err,
              });
            }
            if (updatedProfile) {
              return res.status(200).json({
                msg: "profile updated susccefuly",
                profile: updatedProfile,
              });
            }
          }
        );
      } else {
        // add new profile
        new Profile(profileData).save((err, profile) => {
          if (err)
            return res
              .status(500)
              .json({ msg: "cant create profile", error: err });
          if (profile)
            return res
              .status(200)
              .json({ msg: "profile created susccefuly", profile: profile });
        });
        console.log("no selected profile");
      }
    });
  }
);

// @route       GET api/profile
// @desc        get all profiles
// @access      Public
router.get("/", async (req, res, next) => {
  try {
    const fetchedProfiles = await Profile.find().populate("userId", [
      "name",
      "avatar",
    ]);
    res.status(200).json({
      msg: "profiles fetched susccefuly",
      profile: fetchedProfiles,
    });
  } catch (err) {
    return res.status(500).json({ message: "cant fetch profiles", error: err });
  }
});

// @route       GET api/profile/:user_id
// @desc        get a profile by user_id
// @access      Public
router.get("/:user_id", async (req, res, next) => {
  try {
    const fetchedProfile = await Profile.findOne({
      userId: req.params.user_id,
    }).populate("userId", ["name", "avatar"]);
    if (!fetchedProfile)
      return res.status(400).json({ message: "Profile not found" });
    res.status(200).json({
      msg: "profiles fetched susccefuly",
      profile: fetchedProfile,
    });
  } catch (err) {
    if (err.kind == "ObjectId")
      return res.status(400).json({ message: "Profile not found" });
    return res
      .status(500)
      .json({ message: "server error: can't fetch profile", error: err });
  }
});

// @route       DELETE api/profile
// @desc        delete all info related to user : profile,posts,user
// @access      Private
router.delete("/", authCheck, (req, res, next) => {
  Profile.findOneAndDelete({ userId: req.userId })
    .then((profileResult) => {
      if (!profileResult)
        return res.status(400).json({
          message:
            "there is no profile associated to the current user to be deleted",
        });
      User.findOneAndDelete({ _id: req.userId })
        .then((userResult) => {
          if (!userResult)
            return res.status(400).json({ message: "User not found" });
          res
            .status(200)
            .json({ message: "user & all data related susccefuly deleted" });
        })
        .catch((err) => {
          return res
            .status(500)
            .json({ message: "server error: can't delete user" });
        });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Server error: can't delete profile", error: err });
    });
});

// @route       PUT api/profile/experience
// @desc        add an experience for the current user
// @access      Private
router.put(
  "/experiences",
  [
    authCheck,
    body("title", "Title of the experience is required").not().isEmpty(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ validationErrors: errors.array() });
    }

    experienceData = {};
    if (req.body.title) experienceData.title = req.body.title;
    if (req.body.company) experienceData.company = req.body.company;
    if (req.body.location) experienceData.location = req.body.location;
    if (req.body.from) experienceData.from = req.body.from;
    if (req.body.to) experienceData.to = req.body.to;
    if (req.body.current) experienceData.current = req.body.current;
    if (req.body.description) experienceData.description = req.body.description;

    try {
      const selectedProfile = await Profile.findOne({ userId: req.userId });

      selectedProfile.experiences.unshift(experienceData);
      await selectedProfile.save();
      return res.status(200).json({
        message: "experience susccefuly  added to the profile",
        profile: selectedProfile,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Server error: can't add experience to the profile",
        error: err,
      });
    }
  }
);
module.exports = router;
