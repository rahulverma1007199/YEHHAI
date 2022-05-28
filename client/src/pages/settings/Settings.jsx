import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {
  const [username,setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [file,setFile] = useState("");
  const {user,dispatch} = useContext(Context);
  const PF = "http://localhost:5000/images/"


const handleSubmit = async (e) => {
  e.preventDefault();
  dispatch({type:"UPDATE_START"})
  const updatedUser = {
    userId : user._id,
    username,email , password
  };
  if(file){
    const data = new FormData();
    const filename =  Date.now() + file.name;
    data.append("name",filename);
    data.append("file",file);
    updatedUser.profilePic = filename;
    try {
      await axios.post("http://localhost:5000/api/upload/",data);
    } catch (error) {
      
    }
  }try {
    const res = await axios.put("http://localhost:5000/api/user/"+user._id,updatedUser);
    setSuccess(true)
    dispatch({type:"UPDATE_SUCCESS",payload : res.data});
  } catch (error) {
    dispatch({type:"UPDATE_FAILURE"})
  }
}

console.log(file);
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : "" }
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder={user.username} name="name" onChange={(e)=>{
            setUsername(e.target.value);
          }}/>
          <label>Email</label>
          <input type="email" placeholder={user.email} name="email" onChange={(e)=>{
            setEmail(e.target.value);
          }}/>
          <label>Password</label>
          <input type="password" placeholder="Password" name="password" onChange={(e)=>{
            setPassword(e.target.value);
          }}/>
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {success && <span style={{color:"green",textAlign:"center"}}>Profile has been updated</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
