const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const cors = require('cors');
const path = require('path');
const multer = require('multer');
dotenv.config();
app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(cors({
  origin:'http://localhost:3000'
}));
main().then(console.log("Database in connected")).catch(err => console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGO_URL);
  }

const storage = multer.diskStorage({
  destination:(req,file,cb) => {
    cb(null,'images')
  },filename:(req,file,cb)=>{
    cb(null,req.body.name);
  }
});  

const upload = multer({storage:storage});
app.post ("/api/upload", upload.single('file'), (req,res)=>{
  res.status(200).json("file has been uploaded");
});

app.use("/api/auth",authRoute);  
app.use("/api/user",userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.listen("5000", () => {
  console.log("Backend is Running");
});
