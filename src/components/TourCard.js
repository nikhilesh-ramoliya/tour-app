import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Chip } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { DeleteTour } from '../redux/feature/tourSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export default function TourCard({ title, imageFile, discription, tags, _id, edit }) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    return (
        <Card sx={{ maxWidth: 305, margin: "10px", minWidth: 300, boxShadow: "4px 4px 10px 2px lightgrey" }}>
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
                    {
                        edit && <><Button sx={{
                            height: "30px",
                            padding: '10px 0px 10px 0px',
                            margin: "0",
                            textDecoration: "underline"
                        }}
                            onClick={() => {
                                navigate(`/dashboard/${_id}`)
                            }}
                        >
                            edit
                        </Button>
                            <Button sx={{
                                height: "30px",
                                padding: '10px 0px 10px 0px',
                                margin: "0",
                                textDecoration: "underline"
                            }}
                                onClick={() => {
                                    dispatch(DeleteTour({ toast, _id }));
                                }}
                            >
                                Delete
                            </Button>
                        </>
                    }

                </CardContent>
            </CardActionArea>
        </Card>
    );
}