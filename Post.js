import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@material-ui/core/Grid';

const Post = (props) => {
    
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={3} >
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={props.dp}>
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={props.author}
                        subheader={props.postingDate}
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={props.postImage}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {props.postDesc}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid >)
}

export default Post;
