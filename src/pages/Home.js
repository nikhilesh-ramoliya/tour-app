import React from 'react'
import "./Home.css"
import { useSelector } from 'react-redux';
import TourCard from './../components/TourCard';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';


function Home() {
    const { tours, loading } = useSelector(state => state.tour)
    const { search } = useSelector(state => state.my)
    const excerpt = (str) => {
        if (str?.length > 45) {
            str = str.substring(0, 45) + "..."
        }
        return str
    }

    if (tours === "error") {
        return <Typography>
            error
        </Typography>
    }

    if (loading) {
        return <div className='home'>loading</div>
    }
    return (
        <div className='home'>
            {
                <>
                    <Box display="flex" className="tourbox">
                        {
                            tours?.map(({ title, imageFile, tags, _id, name, discription }) => {
                                if (title.includes(search)) {
                                    return <TourCard key={_id} title={title} imageFile={imageFile} tags={tags} _id={_id} name={name} discription={excerpt(discription)} />
                                }
                            })
                        }
                    </Box>
                </>
            }
        </div >
    )
}

export default Home