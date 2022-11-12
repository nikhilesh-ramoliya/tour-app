import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Chip } from '@mui/material';
import shadows from '@mui/material/styles/shadows';
import Button from '@mui/material/Button';
import { margin } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';

export default function TourCard({ title, imageFile, discription, tags, _id, name }) {
    const navigate = useNavigate();
    return (
        <Card sx={{ maxWidth: 345, margin: "10px", minWidth: 300, boxShadow: "4px 4px 10px 2px lightgrey" }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={imageFile}
                    alt={title}
                />
                <CardContent>
                    {
                        tags?.map((item) => {
                            return <Chip key={item} label={item} variant="outlined" />
                        })
                    }
                    {/* <Chip label="Chip Outlined" variant="outlined" /> */}
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {discription}
                    </Typography>
                    <Button sx={{
                        height: "30px",
                        padding: '10px 0px 10px 0px',
                        margin: "0",
                        textDecoration: "underline"
                    }}
                        onClick={() => {
                            navigate(`/blog/${_id}`)
                        }}
                    >
                        Read more
                    </Button>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}