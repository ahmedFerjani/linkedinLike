const Profile = require("../models/Profile");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const axios = require("axios");
const config = require("config");

exports.getCurrentUser = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      userId: req.userId,
    }).populate("userId", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "No profile for the current user" });
    }

    res.status(200).json({
      msg: "Profile of the current user fetched susccefuly ",
      profile: profile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("server error : profile");
  }
};

exports.createOrUpdateProfile = (req, res, next) => {
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
};

exports.getAllProfiles = async (req, res, next) => {
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
};

exports.getProfileByUserId = async (req, res, next) => {
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
};

exports.deleteProfile = (req, res, next) => {
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
};

exports.addExperience = async (req, res, next) => {
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
};

exports.deleteExperience = async (req, res, next) => {
  try {
    //Get the current user profile
    const selectedProfile = await Profile.findOne({ userId: req.userId });
    //Get experience(to be deleted) index
    const experienceIndex = selectedProfile.experiences
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    if (experienceIndex == -1)
      return res.status(400).json({ message: "experience not found" });
    selectedProfile.experiences.splice(experienceIndex, 1);
    await selectedProfile.save();

    res.status(200).json({
      message: "Experience : " + experienceIndex + " deleted susccefuly",
      profile: selectedProfile,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error: can't delete experience to the profile",
      error: err,
    });
  }
};

exports.addEducation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ validationErrors: errors.array() });
  }

  educationData = {};
  if (req.body.school) educationData.school = req.body.school;
  if (req.body.from) educationData.from = req.body.from;
  if (req.body.to) educationData.to = req.body.to;
  if (req.body.from) educationData.from = req.body.from;
  if (req.body.current) educationData.current = req.body.current;
  if (req.body.fieldStudy) educationData.fieldStudy = req.body.fieldStudy;

  try {
    const selectedProfile = await Profile.findOne({ userId: req.userId });

    selectedProfile.education.unshift(educationData);
    await selectedProfile.save();
    return res.status(200).json({
      message: "education susccefuly  added to the profile",
      profile: selectedProfile,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error: can't add education to the profile",
      error: err,
    });
  }
};

exports.deleteEducation = async (req, res, next) => {
  try {
    //Get the current user profile
    const selectedProfile = await Profile.findOne({ userId: req.userId });
    console.log(selectedProfile);
    //Get education(to be deleted) index
    const educationIndex = selectedProfile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    console.log(educationIndex);
    if (educationIndex == -1)
      return res.status(400).json({ message: "education not found" });
    selectedProfile.education.splice(educationIndex, 1);
    await selectedProfile.save();

    res.status(200).json({
      message: "education : " + educationIndex + " deleted susccefuly",
      profile: selectedProfile,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error: can't delete education to the profile",
      error: err,
    });
  }
};

exports.getGithubUserRepos = (req, res, next) => {
  axios
    .get("https://api.github.com/users/" + req.params.username + "/repos", {
      params: {
        per_page: 5,
        sort: "updated",
        client_id: config.get("githubclientid"),
        client_secret: config.get("githubclientsecret"),
      },
    })
    .then((repos) => {
      console.log(repos.data);
      return res.status(200).json({
        message: "repositories susccefuly fetched",
        repositories: repos.data,
      });
    })
    .catch((err) =>
      res.status(500).json({ message: "cant get repositories", error: err })
    );
};
