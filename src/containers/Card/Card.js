import React, { Component } from 'react'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import classes from './Card.module.css';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
export default class Card extends Component {
    constructor() {
        super();
        this.state = {
            selected: false,
        }
    }

    handleSelectedTrue = (id) => {
        this.setState({ selected: true })
        this.props.onAdd(id-1)
    }
    handleSelectedFalse = (id) => {
        this.setState({ selected: false })
        this.props.onRemove(id-1)
    }
 
    render() {
        return (
            <div className={classes.Card}>

                <p>{this.props.name}</p>
                <p>by</p>
                <p>{this.props.auther}</p>
                <p>{this.props.price} JD</p>
                <p>{this.props.type}</p>
                        <div className={classes.btnContainer}>
                            <div className={classes.btn}>
                                <Fab
                                    aria-label="add"
                                    onClick={() => this.handleSelectedTrue(this.props.id) }
                                    disabled={this.state.selected}
                                    >
                                    <AddIcon />
                                </Fab>
                                </div>
                                <div className={classes.btn}>
                                <Fab
                                    aria-label="add"
                                    onClick={() => this.handleSelectedFalse(this.props.id)}
                                    disabled={!this.state.selected}
                                >
                                    <HighlightOffIcon />
                                </Fab>
                                </div>
                        </div>
            </div>
        )
    }
}
