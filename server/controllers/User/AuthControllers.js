const User = require('../../models/user');
const bcrypt = require('bcrypt');

const { sendRegistrationEmail } = require('../../configs/email/sendEmail');

const home = async (req, res) => {
  try {
    res.status(200).json({ msg: 'Welcome to our home page' });
  } catch (error) {
    console.log(error);
  }
};

// custom error handler
const handleErrors = (err) => {
  let errors = { emailId: '', password: '', uname: '' };
  if (err.code === 11000) {
    if (err.message.includes('uname')) errors.uname = 'The user name is already in use';
    if (err.message.includes('emailId')) errors.emailId = 'The email id is already in use ';
    return errors;
  }
  // validation stuff
  else if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

// POST /api/user/signup
const SignupAuthController = async (req, res) => {
  console.log(req.body);
  const { emailId, password, uname } = req.body;

  try {
    if (password === req.body.againPassword) {
      const user = await User.create({
        emailId,
        password,
        uname,
      });

      console.log(emailId);

      // Send registration email
      const subject = 'Welcome to CredPass!!';
      await sendRegistrationEmail(emailId, subject, '', 'Welcome', uname);
      res.status(201).json({
        success: true,
        user: user,
        token: await user.generateToken(),
      });
    } else {
      res.status(400).send('Passwords do not match!');
    }
  } catch (err) {
    const errors = handleErrors(err);
    console.log(err);
    res.status(400).json({ success: false, errors });
  }
};

const SignupController = (req, res) => {
  res.status(201).json({ success: true, msg: 'Hi from signup Route!' });
};

// POST /api/user/login
const LoginController = (req, res) => {
  res.status(200).json({ status: true, msg: 'Hi There I am from Login controller!!' });
};

const LoginVerifyController = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Find user by email or username
    const userExist = await User.findOne({
      $or: [{ uname: identifier }, { emailId: identifier }],
    });

    console.log(userExist);

    // Check if user exists
    if (!userExist) {
      return res.status(400).json({ message: 'Invalid username or email' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    // If the password is not valid, return an error
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // If login is successful, return the token and user details
    res.status(200).json({
      message: 'Login Successful',
      token: await userExist.generateToken(),
      user: {
        _id: userExist._id,
        emailId: userExist.emailId,
        uname: userExist.uname,
        role: userExist.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  home,
  SignupAuthController,
  SignupController,
  LoginController,
  LoginVerifyController,
};
