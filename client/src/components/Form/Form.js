import React, {useState , useEffect} from "react";
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from "../../actions/posts";
import axios from 'axios';

//Get the ID of the current post we're on

const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({
        title:"",
        message:"",
        tags:"",
        selectedFile:"",
        imageDescription:""
    });
    const [generatedImage, setGeneratedImage] = useState(null);
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(post) {
            setPostData(post);
            setGeneratedImage(null);
        }
    }, [post]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await axios.post("https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4", {
            inputs: postData.imageDescription,
            options: {
                num_samples: 1
            }
        }, {
            headers: {
                Authorization: `Bearer ${"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"}`
            }
        });

        setGeneratedImage(res.data.generated_samples[0].data);

        if(currentId){
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        } else{
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }

        clear();
    };


    if(!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other's memories.
                </Typography>
            </Paper>
        );
    }

    const clear = () =>{
        setCurrentId(null);
        setPostData({title:'',message:'',tags:'',selectedFile:'',imageDescription:''});
        setGeneratedImage(null);
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId? 'Editing':'Creating'} a memory</Typography><br/>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) =>  setPostData({...postData, title: e.target.value})}/>
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) =>  setPostData({...postData, message: e.target.value})}/>
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) =>  setPostData({...postData, tags: e.target.value.split(',')})}/>
                <TextField name="imageDescription" variant="outlined" label="Image Description" fullWidth value={postData.imageDescription} onChange={(e) => setPostData({...postData, imageDescription: e.target.value})}/>
                <div className={classes.fileInput}><FileBase type="file"  multiple = {false}  onDone = {({base64}) => setPostData({...postData, selectedFile:base64})}/></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>

            {generatedImage && (
                <div>
                    <img src={`data:image/png;base64,${generatedImage}`} alt="Generated Image" />
                </div>
            )}

        </Paper>
    );

}

export default Form;