const { User } = require('../../models')
const { NotFound } = require('http-errors')

const verify = async (req, res) => {
  try {
    const { verificationToken } = req.params
    const user = await User.findOne({ verificationToken })

    if (!user) {
      throw new NotFound('User not found')
    }
    await User.findByIdAndUpdate(user._id, {
      verificationToken: null,
      verify: true,
    })

    res.status(200).json({
      status: 'success',
      code: 200,
      message: ' Verification successful',
    })
  } catch (error) {
    res.status(404).json(error)
  }
}

module.exports = verify