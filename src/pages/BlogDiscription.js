import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { CardMedia, Chip, Typography } from '@mui/material/';
import { width } from '@mui/system';

const BlogDiscription = () => {
    const { id } = useParams();
    const data = useSelector(state => state.tour.tours);
    const tour = data?.filter((item) => {
        return item._id == id
    })
    const { title, imageFile, discription, tags, _id, name } = tour[0];
    return (
        <Box maxWidth="1000px" margin="auto" display="flex" alignItems="center" flexDirection="column" justifyContent="center">
            <Typography variant='h3' margin="10px">{title}</Typography>
            <Typography variant='body1' margin="10px">{discription}</Typography>
            <Box
                maxHeight="500px"
                maxWidth="500px"
                overflow="hidden"
            >
                <CardMedia
                    component="img"
                    image={imageFile}
                    alt={title}
                    sx={{
                        width: "100%",
                        height: "auto",
                    }}

                />

            </Box>
            <Box flexDirection="row" margin="10px">
                {
                    tags?.map((item) => {
                        return <Chip key={item} label={item} variant="outlined" />
                    })
                }
            </Box>
        </Box >
    )
}

export default BlogDiscription