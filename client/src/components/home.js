import React, { useState, useEffect } from 'react';
//import BlogPost from './blogpost'; 
import { Link } from 'react-router-dom'


const Home = () => {

  const [data, setData] = useState({});
  

  // Stores data from backend when the page loads (only called once per load)
  useEffect(() => {
    callBackendAPI()
 

  }, []);

  //
  const callBackendAPI = async () => {
    const response = await fetch('/home');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
   // console.log(body);
    setData(body);

    return body
  };

  


  const finalValue = () => {
   
    if(data.posts){
    return (
      <div className="Home">
        {
          data.posts.map((post) => {
            const key = "element_" + post._id.toString() + "key";
            return (
              <div key={key}>
              <Link to = {{
                pathname: '/blogpost',
                state: {
                  id: post._id
                }
              }}>{post.title}</Link>
              <p>{post.text}</p>
              <p>{post.author.username}</p>
              
              </div>
            );
          })
        }
        
      {/* <BlogPost id={(data.posts[0]._id)} />  */}
      </div>
    )
      } 
      return <p>error</p>
  };

  return finalValue();
};

export default Home;