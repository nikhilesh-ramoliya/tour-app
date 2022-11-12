import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getTours } from './../redux/feature/tourSlice';
import "./Home.css"
import { useSelector } from 'react-redux';
import TourCard from './../components/TourCard';
import { Box } from '@mui/system';
import { useMemo } from 'react';


function Home() {
    const dispatch = useDispatch();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { tours, loading, tour } = useSelector(state => state.tour)


    const excerpt = (str) => {
        if (str.length > 45) {
            str = str.substring(0, 45) + "..."
        }
        return str
    }

    if (loading) {
        return <div className='home'>loading</div>
    }
    return (
        <div className='home'>
            {
                tours.length === 0 ? "no tours found" :
                    <>
                        <Box display="flex" className="tourbox">
                            {
                                tours?.map(({ title, imageFile, tags, _id, name, discription }) => {
                                    return <TourCard key={_id} title={title} imageFile={imageFile} tags={tags} _id={_id} name={name} discription={excerpt(discription)} />
                                })
                            }
                        </Box>
                    </>
            }
        </div >
    )
}

export default Home