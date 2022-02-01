const { User } = require('../../models');
// const nodemailer = require("nodemailer");
const { sendEmail } = require('../../helpers');
const { BadRequest, NotFound } = require('http-errors');

const resendingEmail = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      throw new BadRequest('Missing required field email')
    }
    const user = await User.findOne({ email })

    if (!user) {
      throw new NotFound('User not found')
    }
    if (user.verify) {
      throw new BadRequest('Verification has already been passed')
    }
         
    const emailMessage = {
      to: user.email,
      subject: 'Account verification',
      html: `
        <a href = "http://localhost:3000/api/auth/verify/${user.verificationToken}" target="_blank">Verify link</a>`,
    }
      await sendEmail(emailMessage)
      
      res.status(200).json({
      status: 'success',
      code: 200,
      message: ' Verification email sent',
    })
  } catch (error) {
      res.status(404).json(error)
  }
}

module.exports = resendingEmail