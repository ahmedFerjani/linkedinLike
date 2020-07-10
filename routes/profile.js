const express = require("express");
const router = express.Router();
const authCheck = require("../middlewares/authCheck");
const { body, validationResult } = require("express-validator");
const profileController = require("../controllers/profile");

// @route       GET api/profile/current
// @desc        get current user profile
// @access      Private
router.get("/current", authCheck, profileController.getCurrentUser);

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
  profileController.createOrUpdateProfile
);

// @route       GET api/profile
// @desc        get all profiles
// @access      Public
router.get("/", profileController.getAllProfiles);

// @route       GET api/profile/:user_id
// @desc        get a profile by user_id
// @access      Public
router.get("/:user_id", profileController.getProfileByUserId);

// @route       DELETE api/profile
// @desc        delete all info related to user : profile,posts,user
// @access      Private
router.delete("/", authCheck, profileController.deleteProfile);

// @route       PUT api/profile/experience
// @desc        add an experience for the current user
// @access      Private
router.put(
  "/experiences",
  [
    authCheck,
    body("title", "Title of the experience is required").not().isEmpty(),
  ],
  profileController.addExperience
);

// @route       DELETE api/profile/experience/:exp_id
// @desc        Delete an experience for the current user
// @access      Private
router.delete(
  "/experience/:exp_id",
  authCheck,
  profileController.deleteExperience
);

// @route       PUT api/profile/education
// @desc        add an education for the current user
// @access      Private
router.put(
  "/education",
  [
    authCheck,
    body("school", "School is required").not().isEmpty(),
    body("from", "Start date of school education is required").not().isEmpty(),
    body("fieldStudy", "Field of study is required").not().isEmpty(),
  ],
  profileController.addEducation
);

// @route       DELETE api/profile/education/:edu_id
// @desc        Delete education from profile for the current user
// @access      Private
router.delete(
  "/education/:edu_id",
  authCheck,
  profileController.deleteEducation
);

// @route       GET api/profile/github/:username
// @desc        GET repositories
// @access      Public
router.get("/github/:username", profileController.getGithubUserRepos);

module.exports = router;
