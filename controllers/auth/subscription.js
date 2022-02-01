const { User } = require('../../models')

const subscription = async (req, res) => {
  try {
    const { _id } = req.user
    const { subscription } = req.body
    if (
      (subscription === 'starter' ||
        subscription === 'pro' ||
        subscription === 'business') &&
      subscription !== req.user.subscription
    ) {
      const user = await User.findByIdAndUpdate(
        _id,
        { subscription },
        {
          new: true,
        },
      )
      if (user) {
        res
          .status(200)
          .json({ email: user.email, subscription: user.subscription })
        return
      }
    }
    res.json({
      status: 'error',
      code: 404,
      message: 'Alredy subcribed or wrong subscription',
    })
  } catch (error) {
    res.status(404).json(error)
  }
}

module.exports = subscription