import React, { useCallback, useMemo, useState } from 'react'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import classes from './Card.module.css';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export const Card = (props) => {
    const [selected, setSelected] = useState(false)

    const  handleSelectedTrue = useCallback((id) => {
        setSelected(true)
        props.onAdd(id - 1)
    }, [props]);
    const handleSelectedFalse = useCallback((id) => {
        setSelected(false)
        props.onRemove(id - 1)
    }, [props]);

    return (
        useMemo(() =>
            <div className={classes.Card}>

                <p>{props.name}</p>
                <p>by</p>
                <p>{props.auther}</p>
                <p>{props.price} JD</p>
                <p>{props.type}</p>
                <div className={classes.btnContainer}>
                    <div className={classes.btn}>
                        <Fab
                            aria-label="add"
                            onClick={() => handleSelectedTrue(props.id)}
                            disabled={selected}
                        >
                            <AddIcon />
                        </Fab>
                    </div>
                    <div className={classes.btn}>
                        <Fab
                            aria-label="add"
                            onClick={() => handleSelectedFalse(props.id)}
                            disabled={!selected}
                        >
                            <HighlightOffIcon />
                        </Fab>
                    </div>
                </div>
            </div>
        ,[handleSelectedFalse, 
            selected,
            props,
            handleSelectedTrue,
        ]))
}
export default Card;
