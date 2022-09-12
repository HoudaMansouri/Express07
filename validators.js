// const validateMovie = (req, res, next) => {
//   // validate req.body then call next() if everything is ok
//   const { title, director, year, color, duration } = req.body;

//   const errors = [];
//   if (title == null) {
//     errors.push({ field: "title", message: "This field is required." });
//   } else if (title.length >= 255) {
//     errors.push({
//       field: "title",
//       message: "Should contain less than 255 characters",
//     });
//   }
//   if (director == null) {
//     errors.push({ field: "director", message: "This field is required." });
//   }
//   if (year == null) {
//     errors.push({ field: "year", message: "This field is required." });
//   }
//   if (color == null) {
//     errors.push({ field: "color", message: "This field is required." });
//   }
//   if (duration == null) {
//     errors.push({ field: "duration", message: "This field is required." });
//   }
//   if (errors.length) {
//     res.status(422).json({ validationErrors: errors });
//   } else {
//     next();
//   }
// };

// const validateUser = (req, res, next) => {
//   const { firstname, lastname, email, city, language } = req.body;
//   const errors = [];
//   const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;
//   if (firstname == null) {
//     errors.push({ field: "firstname", message: "This field is required." });
//   }

//   if (lastname == null) {
//     errors.push({ field: "lastname", message: "This field is required." });
//   }
//   if (!emailRegex.test(email)) {
//     errors.push({ field: "email", message: "Invalid email." });
//   }
//   if (city == null) {
//     errors.push({ field: "city", message: "This field is required." });
//   }
//   if (language == null) {
//     errors.push({ field: "language", message: "This field is required." });
//   }
//   if (errors.length) {
//     res.status(422).json({ validationErrors: errors });
//   } else {
//     next();
//   }
// };

const Joi = require("joi");

const movieSchema = Joi.object({
  title: Joi.string().email().max(255).required(),
  director: Joi.string().max(255).required(),
  year: Joi.string().max(255).required(),
  color: Joi.string().max(255).required(),
  duration: Joi.string().max(255).required(),
});

const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;

  const { error } = movieSchema.validate(
    { title, director, year, color, duration },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

const userSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  firstname: Joi.string().max(255).required(),
  lastname: Joi.string().max(255).required(),
});

const validateUser = (req, res, next) => {
  const { firstname, lastname, email } = req.body;

  const { error } = userSchema.validate(
    { firstname, lastname, email },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = {
  validateMovie,
  validateUser,
};
