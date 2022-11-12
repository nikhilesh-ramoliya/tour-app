import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import "./Home.css"
import { useSelector } from 'react-redux';
import TourCard from './../components/TourCard';
import { Box } from '@mui/system';


function Dashboard() {
    const { userTours, loading } = useSelector(state => state.tour)
    const { search } = useSelector(state => state.my)

    const excerpt = (str) => {
        if (str.length > 45) {
            str = str.substring(0, 40) + "..."
        }
        return str
    }
    if (loading.userTours) {
        return <div className='home'>loading</div>
    }
    return (
        <div className='home'>
            {
                userTours?.length === 0 ? "no tours found" :
                    <>
                        <Box display="flex" className="tourbox">
                            {
                                userTours?.map(({ title, imageFile, tags, _id, name, discription }) => {
                                    if (title.includes(search)) {
                                        return <TourCard key={_id} title={title} imageFile={imageFile} tags={tags} _id={_id} name={name} discription={excerpt(discription)} edit={true} />
                                    }
                                })
                            }
                        </Box>
                    </>
            }
        </div >
    )
}

export default Dashboard