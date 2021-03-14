import classes from './InputFields.module.css';
import TextField from '@material-ui/core/TextField';

export const TextArea = (props) => {
    return (
              <div  className={classes.fields}>
              <TextField 
                    id={props.id}
                    className={classes.textField}
                    label={props.label}
                    variant="outlined"
                    type={props.type}
                    onChange={props.onChange}
                    value={props.value}
                    error={props.error}
                   required
                   multiline
                   rows={props.rows}
                /> 
        </div>
    )
}
export default TextArea