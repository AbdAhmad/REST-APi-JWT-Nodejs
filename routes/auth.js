const router = require('express').Router();
const User = require('../model/User');
const { signupValidation, signinValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {

    const {error} = signupValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({ email: req.body.email });
    if(emailExist) return res.status(400).send("Email already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    user.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
                res.status(500).send('Error occured while registering the user.');    
        })
});

router.post('/signin', async (req, res) => {

    const {error} = signinValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send("Email not found");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send("Invalid Password");

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    // res.send('Logged In!');

});

module.exports = router;




