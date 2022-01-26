const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')

const { User } = require('../../models')

const avatarDir = path.join(__dirname, '../../public/avatars')

const avatarUpdate = async (req, res) => {
  const { path: tempPath, originalname } = req.file
  try {
    const { _id } = req.user

    const [extention] = originalname.split('.').reverse()
    const newName = `${_id.toString()}${extention}${originalname}`
    const uploadPath = path.join(avatarDir, newName)

    const file = await Jimp.read(tempPath)
    await file.resize(250, 250).write(tempPath)
    await fs.rename(tempPath, uploadPath)
    const avatarURL = `/avatars/${newName}`

    await User.findByIdAndUpdate(_id, { avatarURL })
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: avatarURL,
      },
    })
  } catch (error) {
    await fs.unlink(tempPath)
    throw new Error(error)
  }
}

module.exports = avatarUpdate