import TextField from '@material-ui/core/TextField';
import classes from './InputFields.module.css';
export const InputFields = (props) => {
    return (
        <div  className={classes.fields}>
              <TextField 
                    id={props.id}
                    className={classes.field}
                    label={props.label}
                    variant="outlined"
                    type={props.type}
                    onChange={props.onChange}
                    value={props.value}
                    error={props.error}
                   required
                /> 
        </div>
    )
}
export default InputFields