import UserModel from "../Models/User.js";
import cryto from "crypto-js";

export const getSignup = (req, res) => {
  res.render("user/signup");
};

export const postSignup = (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  UserModel.findOne({ email: req.body.email })
    .then((foundUser) => {
      if (foundUser) {
        return res
          .status(400)
          .render("auth/signup", { errorMessage: "email already taken." });
      }
      return UserModel.create({ firstName, lastName, email, password })
        .then((response) => {
          console.log("new User", response);
          res.status(201).json(response);
        })
        .catch((err) => console.log("err", err));
    })
    .catch((err) => console.log("err", err));
};

export const getLogin = (req, res) => {
  res.render("user/login");
};

export const postLogin = (req, res) => {
  const { email: l, password: p } = req.body;

  UserModel.findOne({ email: req.body.email })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(401).json({ message: "User not found." });
        return;
      }
      if (
        cryto.SHA1(p).toString() === foundUser.password &&
        foundUser.email === l
      ) {
        req.session.auth = true;
      }

      if (req.session.auth) {
        req.session.user = foundUser;
        res.redirect("/user/infoUser");
      } else {
        res.redirect("/user/login");
      }
    })
    .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
};

export const infoUser = (req, res) => {
  res.render("user/infoUser", req.session.user);
};

// export const newUser = (req, res) => {
//   const newUser = {
//     firstName: "Ha Thu",
//     lastName: "Tran",
//     email: "tranhathu6989@gmail.com",
//     password: "7c4a8d09ca3762af61e59520943dc26494f8941b", // correspond à "123456"
//   };

//   UserModel.create(newUser)
//     .then((response) => {
//       console.log("new User", response);
//       res.status(201).json(response);
//     })
//     .catch((err) => console.log("err", err));
// };

export const createManyUsers = (req, res) => {
  const userArr = [
    {
      firstName: "Ha Thu",
      lastName: "Tran",
      email: "tranhathu6989@gmail.com",
      password: "7c4a8d09ca3762af61e59520943dc26494f8941b", // correspond à "123456"
    },
    {
      firstName: "Alan",
      lastName: "Lepenven",
      email: "alan@gmail.com",
      password: "7c4a8d09ca3762af61e59520943dc26494f8941b", // correspond à "123456"
    },
    {
      firstName: "David",
      lastName: "Zitoun",
      email: "david@gmail.com",
      password: "7c4a8d09ca3762af61e59520943dc26494f8941b", // correspond à "123456"
    },
    {
      firstName: "An",
      lastName: "Tran",
      email: "an@gmail.com",
      password: "7c4a8d09ca3762af61e59520943dc26494f8941b", // correspond à "123456"
    },
  ];

  UserModel.insertMany(userArr)
    .then((response) => {
      console.log("many Users", response);
      res.status(201).json(response);
    })
    .catch((err) => console.log("err", err));
};
