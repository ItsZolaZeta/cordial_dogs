import React, { useState, useEffect } from 'react';


const BlogPost = (props) => {

    const [data, setData] = useState({});
    const [comment, setComment] = useState();


    // Stores data from backend when the page loads (only called once per load)
    useEffect(() => {
       callBackendAPI();
        
    }, []);

    //
    const callBackendAPI = async () => {
        //console.log(props);
        const response = await fetch('/blogpost/' + props.location.state.id);
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        // console.log(body);
        setData(body);

        return body
    };


    //--------------------------------------------------------------------------------------------------

    const blogpost = () => {
        //console.log(data);

        if (data.author) {
            return (<div>
                <p>{data.title}</p>
                <p>{data.text}</p>
                <p>{data.author.first_name}</p>
                <p>{data.date}</p>
            </div>

            )
        }

        return (<div>
            <p>{data.title}</p>
            <p>{data.text}</p>
            <p>{data.date}</p>
        </div>

        )

    };
    //--------------------------------------------------------------------------------------------------


    const commentForm = () => {

        return (
            <form onSubmit={handleSubmit}>
                <label>
                    Comment text:
                    <textarea value={comment} onChange={handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );

    };
    //--------------------------------------------------------------------------------------------------

    const handleSubmit = async (event) => {
        event.preventDefault();
        var blogpostID = String(props.location.state.id); 
        var info = { text: comment, blogpostID: blogpostID };
        console.log(blogpostID);

        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(info)
        };
        const response = await fetch('/comment/blogpost/' + props.location.state.id, reqOptions);
        const body = await response.json();

        if (response.status !== 200) {

            try {
                throw new Error(body.msg);
            } catch (e) {
                console.log(e);
            }
        }
        // console.log(body);
        //setData(body);
        console.log(body);
        // return body
    };


    //--------------------------------------------------------------------------------------------------

    const handleChange = (event) => {
        console.log(event.target.value);
        setComment(event.target.value);
    };


    //--------------------------------------------------------------------------------------------------

    const finalValue = () => {
        return (<div>
            {blogpost()}
            {commentForm()}
        </div>)
    };

    return finalValue();
};

export default BlogPost;