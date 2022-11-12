import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const EditTour = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const state = useSelector(state => state.tour.userTours);
    const tours = state.filter((item) => {
        return item._id == id;
    })
    const tour = tours[0]


    return (
        <div>EditTour</div>
    )
}

export default EditTour