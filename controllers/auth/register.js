const {Conflict} = require("http-errors");
const { User } = require("../../models");
const gravatar = require('gravatar');

const register = async(req, res)=>{
    const {email, password, subscription} = req.body;
    const user = await User.findOne({email});
    if(user){
        throw new Conflict("Already register");
    }

    const avatarURL = gravatar.url(email)

    const newUser = new User({ email, subscription, avatarURL });
    
    newUser.setPassword(password);
    await newUser.save();

    res.status(201).json({
        status: "success",
        code: 201,
        message: "Success register"
    });
};

module.exports = register;