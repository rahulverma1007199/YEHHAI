import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import axios from "axios";
import Slidebar from "../../components/slidebar/Slidebar";
export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const [top5,setTop5] = useState([]);
  const {search} = useLocation();
  useEffect(()=>{
    const fetchPosts = async ()=>{
      const res = await axios.get("http://localhost:5000/api/posts"+search);
      const top5post = await axios.get("http://localhost:5000/api/posts/?user=top5");
      setPosts(res.data);
      setTop5(top5post.data);
    }
    fetchPosts()
  },[search]);
  return (
    <>
      <Slidebar className='sliderbar' top5={top5} />
      <div className="home">
        <Posts posts = {posts}/>
        <Sidebar />
      </div>
    </>
  );
}
