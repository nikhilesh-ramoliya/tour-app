import { Button, TextField } from '@mui/material';
import ChipInput from 'material-ui-chip-input';
import React, { useState } from 'react'
import "./AddTour.css"
import FileBase from "react-file-base64";
import { useSelector, useDispatch } from 'react-redux';
import { createTour, editTour } from './../redux/feature/tourSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


function AddTour() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const { userTours } = useSelector(state => state.tour)
    var initialstate = {
        title: "",
        discription: "",
        tags: [],
    }
    if (id) {
        const tours = userTours.filter((item) => {
            return item._id === id
        })
        initialstate = tours[0]
    }

    const [tourData, setTourdata] = useState(initialstate);
    const handleChange = (e) => {
        setTourdata({
            ...tourData,
            [e.target.name]: e.target.value
        })
    }

    const handleAddTag = (tag) => {
        setTourdata({
            ...tourData, tags: [...tourData.tags, tag]
        })
    }
    const handleDeleteTag = (tagD) => {
        setTourdata({
            ...tourData,
            tags: tourData.tags.filter((tag) => tag !== tagD)
        })
    }
    const handleClear = () => {
        setTourdata(initialstate)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (id === undefined) {
            console.log("handle submit");
            dispatch(createTour({ tourData, toast, navigate }))
            return;
        }
        dispatch(editTour({ tourData, toast, navigate }))
    }


    return (
        <div className='tour'>
            <h1>{id ? "Edit" : "Add"} tour</h1>
            <br /><br />
            <form >
                <TextField
                    type="text"
                    required
                    autoComplete='off'
                    fullWidth
                    id="title"
                    label="title"
                    name="title"
                    placeholder='please provide title'
                    value={tourData.title}
                    onChange={handleChange}
                />
                <TextField
                    type="text"
                    required
                    autoComplete='off'
                    fullWidth
                    id="discription"
                    label="discription"
                    name="discription"
                    placeholder='please provide title'
                    value={tourData.discription}
                    onChange={handleChange}
                />
                <ChipInput
                    name="tags"
                    variant='outlined'
                    placeholder='enter tag'
                    fullWidth
                    value={tourData.tags}
                    onAdd={(tag) => handleAddTag(tag)}
                    onDelete={(tag) => handleDeleteTag(tag)}
                />
                <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => {
                        setTourdata({ ...tourData, imageFile: base64 })
                    }
                    }
                />
                <br />
                <Button variant="contained" color="primary" type='submit' onClick={handleSubmit} name="submit">
                    submit
                </Button>
                <Button variant="contained" color="primary" onClick={handleClear} >
                    clear
                </Button>

            </form>
        </div>
    )
}

export default AddTour