const express = require("express")
const app = express()
const cors = require("cors")
const uid = require("uid")
const mongoose = require('mongoose')
const router = require("./modules/router");




mongoose.connect('mongodb+srv://admin:admin1@cluster0.smg2omw.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('Connected Successfully to Mongo DB')
})
.catch(e => {
    console.log(e)
})

const userSchema = require("./schemas/userSchema")

const findAll = async () => {
    const users = await userSchema.find()

    console.log(users)
}

findAll()

app.use(cors())
app.use(express.json())


app.use(router);

let chats = []

app.post("/register", async (req, res) => {
    const user = req.body

    const userExists = await userSchema.findOne({ email: user.email });
  if (userExists) {
    return res.status(400).send({ error: "User with that email already exists" });
  }

  const newUser = new userSchema({
    email: user.email,
    password: user.passOne,
  });

  await newUser.save();

  res.send({ success: true });
});

app.post("/login", async (req, res) => {
    const user = req.body

    const dbUser = await userSchema.findOne({
        email: user.email,
        password: user.password
    })

    if(dbUser) {
        res.send({success: true, user: dbUser})
    } else {
        res.send({success: false})
    }
})

app.get('/getUsers', async (req, res) => {
    const users = await userSchema.find()
    res.send({ users })
  })

app.get('/getUser/:id', async (req, res) => {
  const {id} = req.params
  const user = await userSchema.findOne({_id: id})
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send({ user });
  })


app.get('/getChat/:id', (req, res) => {
    const {id} = req.params
    const chat = chats.find(x => x.id === id)
    res.send({chat})
})


app.post('/addMessage', (req, res) => {
    const {id, message} = req.body

    const currentChatIndex = chats.findIndex(x => x.id === id)

    chats[currentChatIndex].messages.push(message)

    console.log(req.body)

    res.send({chat: chats[currentChatIndex]})
})


app.post("/openChat", (req, res) => {
    const {userOne, userTwo} = req.body

    const chatExists = chats.find(x => x.participants.includes(userTwo) && x.participants.includes(userOne))

    if(chatExists) {
        return  res.send({chatId: chatExists.id})
    }

    const singleChat = {
        id: uid.uid(),
        participants: [
            userOne,
            userTwo
        ],
        messages: []
    }

    chats.push(singleChat)

    res.send({chatId: singleChat.id})
})

app.post("/change-password", async (req, res) => {
    const { email, newPassword } = req.body;
  
    try {
      const dbUser = await userSchema.findOne({ email: email });
  
      if (!dbUser) {
        return res.status(404).send({ error: "User not found" });
      }
  
      dbUser.password = newPassword;
      await dbUser.save();
  
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "An error occurred while changing the password." });
    }
  });

  app.delete('/delete-user', async (req, res) => {
    const { email } = req.body;
  
    try {
      const deletedUser = await userSchema.findOneAndDelete({ email });
  
      if (!deletedUser) {
        return res.status(404).send({ error: "User not found" });
      }
  
      res.send({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "An error occurred while deleting the user." });
    }
  });



app.listen(2500)