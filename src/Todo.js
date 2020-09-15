import React,{ useState } from 'react'
import './Todo.css';
import db from './firebase';
import { List, ListItemText, ListItem, ListItemAvatar, Modal, Button, makeStyles, FormControl, Input, InputLabel } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'relative',
        width: 400,
        top: '50%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: '30px',
        marginRight: 'auto',
        marginLeft: 'auto'
        
        
    },
}));

function Todo(props) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(true);
    };
    //Update todo with new text
    const updateTodo = () =>
    {
        db.collection('todos').doc(props.todo.id).set({
            todo: input,
            
        }, { merge: true });

        setOpen(false);
    }

    return (
        <>
        <Modal 
        open={open}
        onClose={e => setOpen(false)}>
            <div className={classes.paper} >

                <form>
                    <FormControl>
                        <InputLabel>Update ToDo</InputLabel>
                        <Input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value) }/>
                    </FormControl>
                    <Button type='submit' disabled={!input} variant="contained" color="primary" onClick={updateTodo}>Update ToDo
                    </Button>
                
                </form>

            </div>


        </Modal>
        <List className="todo_list">
            <ListItem>
                <ListItemAvatar>
                    
                </ListItemAvatar>
                <ListItemText primary={props.todo.todo} secondary="Deadline"></ListItemText>
            </ListItem>
            <Button className="todo_btn" color="primary" variant="contained" onClick={e => setOpen(true)}>Edit</Button>
            <Button className="todo_btn" color="secondary" variant="contained" onClick={event => db.collection('todos').doc(props.todo.id).delete() } >Delete</Button>
        </List>
        </>
    )
}

export default Todo
