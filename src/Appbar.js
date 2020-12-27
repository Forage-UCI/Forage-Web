import React, {useRef} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import AuthStateApp from './AppAuth'
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
        display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        width: '20ch',
        '&:focus': {
            width: '30ch',
        },
        },
    },
    buttonSize:{
        marginRight: theme.spacing(2)

    },
    grow: {
        flexGrow: 1,
    },
    }));


    

export default function SearchAppBar() {
    const classes = useStyles();
    const history = useHistory();

    const onEnter =  (event) =>{
        if (event.keyCode === 13){
            console.log(valueRef.current.value);
            const topicID = valueRef.current.value;
            if (topicID){
                const searchContent = `/search/${topicID}`;
                history.push(searchContent);
            }
            
        } 
    }
    const valueRef = useRef('') //creating a refernce for TextField Component

    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
                Forage
            </Typography>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onKeyDown={onEnter}
                    inputRef={valueRef}
                />
            </div>
            <div>
                <a href="http://chatbot-annan.s3-website-us-east-1.amazonaws.com/">Have Questions?</a>
            </div>
            <div className={classes.grow}/>
            <div className={classes.buttonSize}>
                <AuthStateApp/>
            </div>
            </Toolbar>
        </AppBar>
        </div>
    );
    }

