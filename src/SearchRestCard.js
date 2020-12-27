import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 550,
        margin: "30px 0px 30px 0px",
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));
      

export default function RestRecommandCard(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };


    const imageUrl = props.restInfo.imageUrl;
    const restName = props.restInfo.restName;
    const restID = props.restInfo.id;
    const lastVisitTime = props.restInfo.lastVisitTime;
    const restType = props.restInfo.restType;
    const restCount = props.restInfo.restCount;

    const restIntro = `A ${restType} restaurant you visited ${restCount}\n times. Last visit time: ${lastVisitTime}`;
    return (
        <Card className={classes.root}>
        <CardActionArea>
            <CardMedia
                component="img"
                alt={restName}
                height="300"
                image= {imageUrl}
                title={restName}
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {restName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {restIntro}
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" color="primary" >
            Like
            </Button>
            <Button size="small" color="primary" onClick={handleOpen}>
            Check In
            </Button>
            <Modal 
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title"></h2>
            <p id="transition-modal-description">CheckIn Successful.</p>
          </div>
        </Fade>
      </Modal>
        </CardActions>
        </Card>
    );
}

