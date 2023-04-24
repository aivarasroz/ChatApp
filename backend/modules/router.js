const express = require("express");
const router = express.Router();
const AvatarGenerator = require("random-avatar-generator");

router.get("/avatar", (req, res) => {
  const generator = new AvatarGenerator();
  const avatarUrl = generator.generateRandomAvatar();
  res.json({ avatarUrl });
});


router.put('/users/:id', async (req, res) => {
  try {
    const user = await userSchema.findById(req.params.id)
    
    if (!user) {
      return res.status(404).send({ error: 'User not found' })
    }
    
    user.password = req.body.newPassword
    
    await user.save()
    
    res.send({ success: true })
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Server error' })
  }
})
module.exports = router;