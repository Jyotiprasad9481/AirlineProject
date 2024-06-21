const router = require("express").Router();
const User = require("../models/user");
const FeedBackForm = require("../models/feedback");
const country = require("../models/country");
const pinfo = require("../models/personalInfo");
// const state = require("../models/state");
const bycrpyt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/check-auth");
const cors = require("cors");
const mongo = require("mongodb");

router.post("/login", cors(), (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((result) => {
      if (result == null) {
        return res.json({ success: false, message: "Wrong Credential" });
      } else {
        bycrpyt.compare(req.body.password, result.password, (err, ret) => {
          if (err) {
            return res.json({ success: false, message: "encryption issue" });
          } else if (ret) {
            const payload = {
              userId: result._id,
              email: result.email,
            };
            const token = jwt.sign(payload, "aminKey");
            return res.json({
              success: true,
              message: "Login successfully",
              token: token,
            });
          } else {
            return res.json({
              success: false,
              // message: "password do not matched",
              message: "Wrong Credential",
            });
          }
        });
      }
    })
    .catch((err) => {
      res.json({ success: false, message: "mongo error" });
    });
});

router.post("/signup", cors(), (req, res, next) => {
  bycrpyt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.json({ success: false, message: "Password enc issue" + err });
    } else {
      const user = new User({
        displayName: req.body.displayName,
        email: req.body.email,
        password: hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        countryPhoneCode: req.body.countryPhoneCode,
        phoneNumber: req.body.phoneNumber,
        countryName: req.body.countryName,
        address1: req.body.address1,
        city: req.body.city,
        stateName: req.body.stateName,
        postalcode: req.body.postalcode,
        airlineProgram: req.body.airlineProgram,
      });
      user
        .save()
        .then((result) => {
          res.json({ success: true, messaage: "User Created" });
        })
        .catch((err) => {
          if (err.code === 11000) {
            return res.json({
              success: false,
              messaage: "Email id alredy exsits",
            });
          }
          return res.json({
            success: false,
            messaage: "Internal server error",
          });
        });
    }
  });
});

// Personal Information Data CRUD

router.post("/pinfoData", cors(), (req, res, next) => {
  if (!req.body) {
    res.status(400).send({ message: "Content Can not be Empty" });
    return;
  }

  const user = new pinfo(req.body);
  pinfo
    .findOne({ _id: user._id })
    .then((data) => {
      if (data) {
        pinfo
          .findOneAndUpdate(data._id, { $set: req.body })
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res
              .status(500)
              .send({ message: "Some Error occured while posting data" +err });
          });
      } else {
        user.complete = false;
        user
          .save(user)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res
              .status(500)
              .send({ message: "Some Error occured while posting data" });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update user data" });
    });
});
// router.get("/pinfoData", cors(), (req, res, next) => {
//   if (req.query.id) {
//     const id = req.query.id;
//     pinfo
//       .findById(id)
//       .then((data) => {
//         if (!data) {
//           res.status(404).send({ message: "Not Found User with Id " + id });
//         } else {
//           res.send(data);
//         }
//       })
//       .catch((err) => {
//         res.status(500).send({
//           message: "Error retriving user with Id " + id,
//         });
//       });
//   } else {
//     pinfo
//       .find()
//       .then((user) => {
//         res.send(user);
//       })
//       .catch((err) => {
//         res.status(500).send({
//           message: err.message || "Error occured while retriving the data",
//         });
//       });
//   }
// });
router.get("/pinfoData", cors(), (req, res, next) => {
  pinfo
    .find({ complete : false })
    .sort({ _id: -1 })
    .limit(1)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occured while retriving the data",
      });
    });
});

router.put("/pinfoData/:id", cors(), (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to Update Can not be Empty" });
  }
  const id = "6377c7c4f6ef55bf1e83b73f";
  // const id = req.params.id;
  pinfo
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: `Cannot Update user with ${id}. Maybe user not found `,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update user data" });
    });
});

router.get("/pinfoData/:id", cors(), (req, res, next) => {
  pinfo
    .findOne({ _id: req.params.id , complete : false})
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User not found `,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update user data" });
    });
});

router.get("/", checkAuth, (req, res) => {
  const userId = req.userData.userId;
  User.findById(userId)
    .exec()
    .then((user) => {
      pinfo
        .findOne({ email: user.email, complete : false}).sort({_id:-1})
        .then((data) => {
          if (data) {
            user.formId = data._id;
          }
          res.json({ succes: true, data: user });
        })
        .catch((err) => {
          res.status(500).send({ message: "Auth Failed" });
        });
    })
    .catch((err) => {
      res.json({ succes: false, message: "Auth Failed" });
    });
});


router.post("/complete", cors(), (req, res, next) => {
  const formId = req.body._id;
    pinfo
    .updateOne({_id:formId}, {$set:{complete:true}})
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: `Cannot Update form with ${id}. Maybe Form not found `,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update form data" + err });
    });
});


// From review to store in DB
router.post("/add/details", cors(), (req, res) => {
  const feedback = new FeedBackForm(req.body);
  feedback.save(function (e) {
    if (e) {
      res.json({
        error: "Error",
      });
    } else {
      res.json({
        ok: true,
      });
    }
  });
});
router.patch("/", (req, res) => {});

// Country API get

router.get("/countries", (req, res, next) => {
  country
    .find()
    .then((result) => {
      res.status(200).json({ success: true, message: result });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: err });
    });
});

module.exports = router;
