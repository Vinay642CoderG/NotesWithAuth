const express = require('express')
const app = express()
const path = require("path")
const port = 3000
const sequelize = require('./database')
const UserMd = require('./models/user')
const NoteMd = require('./models/note')
const cors = require('cors')
const {authenticateToken, jwtSecretKey, showRequestURL} = require('./middleware')
const jwt = require('jsonwebtoken')
const {Op} = require('sequelize')
const { error } = require('console')

const SECRET_KEY = "a3db6fe10226572b275eb878ff0949e9806eb0db51bca86644242208ebd493d1";

sequelize.sync().then(()=>console.log('db is ready.')).catch((e)=>console.log(e));

// enabling CORS for some specific origins only. 
let corsOptions = { 
  origin : ['http://localhost:5173'], 
} 
 
app.use(cors(corsOptions)) 

//json middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.use(function (err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Invalid JSON in request body:', err.message);
    res.status(400).json({ error: 'Invalid JSON format' });
  } else {
    next(err); // Pass on other errors for further handling
  }
});


// Global error handling middleware
app.use(function (err, req, res, next) {
  console.error('Server Error:', err.stack); // Log the error for debugging
  res.status(500).json({ error: 'Internal Server Error' });
  next(err);
});


// app.use('/static', express.static(path.join(__dirname, 'build/static')))

const api_base_url = "/api/v1"

app.get(`${api_base_url}/users/profile`, authenticateToken, async (req, res)=>{
  const user = await UserMd.findByPk(req.user.id)
  if(user===null){
    res.status(404).send("User doesn't not exist.")
  }else{
    let d = user.get({clone: true})
    delete d.password;
    res.send(d)
  }
})

app.post(`${api_base_url}/users/register`, (req, res)=>{
  UserMd.create(req.body).then(()=>{
    res.send({'msg': "user.is created.", 'error': false});
  }).catch((e)=>{
    res.status(403).send({'msg': "Cannot create user.", 'error': true})
  })
})

app.post(`${api_base_url}/users/login`, async(req, res)=>{
  const {email, password} = req.body;
  let errors = {};

  //field validation
  if(!email){
    errors['email']="Field Required.";
  }else{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email))errors['email']="Invalid Email.";
    if(email.length>256)errors['email']="Length less than equal to 256.";
  }
  if(!password){
    errors['password']="Field Required.";
  }else{
    if(password.length>10)errors['password']="Length less equal to 10.";
  }

if(Object.keys(errors).length!==0){
  res.send(errors)
}
else{
    const user = await UserMd.findOne({where: {email: email, password: password}})
    if(user===null){
      res.status(403).send({"msg": "Invalid Credentials.", error:true})
    }else{
      //set last login
      user.setDataValue("lastLogin", new Date())
      user.save()

      // Generate JWT token
      const token = jwt.sign({ user: { id: user.id, name: user.name } }, jwtSecretKey, { expiresIn: '720h' });
      res.json({ name: user.name, email: user.email, phoneNumber: user.phoneNumber,
        token: token, msg: "login success."
       });
    }
  }
})

app.get(`${api_base_url}/notes`, authenticateToken, async(req, res)=>{
  if(Object.keys(req.query).length != 0 && req.query.q){
    const notes = await NoteMd.findAll({where: {[Op.or]:
      { title: { [Op.like]: `%${req.query.q}%`}}
    }, "userId": req.user.id})
    if(notes.length == 0){
      res.send({'msg': "Not found.", error:true})
    }else{
      res.send({notes: notes, error: false})
    }
  }else{
    //get all notes
    const notes = await NoteMd.findAll({where: {"userId": req.user.id}});
    if(notes===null){
      res.send({msg: "not found", error: true})
    }else{
      res.send({notes: notes, error: false})
    }
  }

})
app.post(`${api_base_url}/notes`, authenticateToken, (req, res)=>{
  let reqdata = req.body;
  reqdata['userId'] = req.user.id;
  NoteMd.create(reqdata).then(()=>{
    res.send({msg:"Note is created.", error: false});
  }).catch((e)=>{
    res.send({msg:"Note is not created.", error: true});
  })
})

app.get(`${api_base_url}/notes/:id`, authenticateToken, async(req, res)=>{
  if (/^\d+$/.test(req.params.id)){
    const note = await NoteMd.findOne({where: {id: req.params.id}});
    if(note===null){
      res.send({'msg': "Not found."})
    }else{
      res.send(note)
    }
  }else{
    res.send({'msg': 'id must be number'})
  }
})

app.put(`${api_base_url}/notes/:id`, authenticateToken, async(req, res)=>{
  const {title, description} = req.body;
  if (/^\d+$/.test(req.params.id)){
    const note = await NoteMd.findOne({where: {id: req.params.id}});
    if(note===null){
      res.send({'msg': "Not found."})
    }else{
      if(title && description){
        note.setDataValue("title", title)
        note.setDataValue("description", description)
        note.save()
      }
      res.send(note)
    }
  }else{
    res.send({'msg': 'id must be number'})
  }
})

app.patch(`${api_base_url}/notes/:id`, authenticateToken, async(req, res)=>{
  const {title, description} = req.body;
  if (/^\d+$/.test(req.params.id)){
    const note = await NoteMd.findOne({where: {id: req.params.id}});
    if(note===null){
      res.send({'msg': "Not found."})
    }else{
      if(title){
        note.setDataValue("title", title)
        note.save()
      }
      else if(description){
        note.setDataValue("description", description)
        note.save()
      }
      else if(title && description){
        note.setDataValue("title", title)
        note.setDataValue("description", description) 
        note.save()
      }
      res.send(note)
    }
  }else{
    res.send({'msg': 'id must be number'})
  }
})

app.delete(`${api_base_url}/notes/:id`, authenticateToken, async(req, res)=>{
  if (/^\d+$/.test(req.params.id)){
    const note = await NoteMd.findOne({where: {id: req.params.id}});
    if(note===null){
      res.send({'msg': "Not found."})
    }else{
      note.destroy()
      res.send({'msg': "Note is deleted."})
    }
  }else{
    res.send({'msg': 'id must be number'})
  }
})

//serving html files
// app.get("*", (_, res) => res.sendFile("index.html", { root: "build" }));



app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}/`)
})