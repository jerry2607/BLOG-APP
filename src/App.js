import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import About from "./About";
import Missing from "./Missing";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Footer from "./Footer";
import { Route,Routes} from "react-router-dom";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {format} from "date-fns";
function App() {
  const navigate=useNavigate();
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    }
  ])
  const [search,setSearch]=useState('');
  const [searchResult,setSearchResult]=useState([]);
  const [postTitle,setPostTitle]= useState('');
  const [postBody,setPostBody]=useState('');
 
  useEffect(()=>{
    const filteredPost=posts.filter(post=>((post.body).toLowerCase()).includes(search.toLowerCase())
    || ((post.title).toLowerCase().includes(search)));
    setSearchResult(filteredPost.reverse());
  },[search,posts]);



  const handleSubmit=(e)=>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length -1].id+1 : 1 ;
    const dateTime = format(new Date(),'MMMM dd,yyyy pp');
    const newPost = {id ,datetime: dateTime,title : postTitle,body :postBody };
    const updatedPosts=[...posts,newPost];
    setPosts(updatedPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
  }
  const handleDelete = (id)=>{
    const updatedPosts = posts.filter(post=>post.id !== id)
    setPosts(updatedPosts);
    navigate('/');
  }
  return (
    <div className="App">
        <Header title='Blog App'/>
        <Nav search={search} setSearch={setSearch}/>
         <Routes> 
            <Route path="/" element={<Home posts={searchResult}/>} />
            <Route path="/newPost" element={<NewPost
              handleSubmit={handleSubmit}
                postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />}/>
            <Route path="/allPost/:id" element={ <PostPage posts={posts} handleDelete={handleDelete}/>} />
            <Route path="/about" element={<About/>}/>
            <Route path="*" element={<Missing/>}/>
        
        </Routes>
      
        <Footer/>
    </div>
  );
}

export default App;
