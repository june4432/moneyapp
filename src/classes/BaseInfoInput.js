import React from 'react';
import ReactDOM from 'react-dom/client';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

class BaseInfoInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
      }

    handleChange(event) {
        //this.setState({value:event.target.value.replace(/[^0-9]/g, '')})
        this.props.onNumberChange(event.target.value.replace(/[^0-9]/g, ''));
    }

    //<span className="biiTitle" >{this.props.title} : </span>

    render() {
        const value = this.props.value
        return (
            <div className="formControl">
                <FormControl fullWidth>
                    <TextField 
                        className="biiContent" 
                        margin="normal" 
                        value={value} 
                        onChange={this.handleChange} 
                        label={this.props.title} 
                        variant="outlined"
                        InputProps={{
                            inputProps: {
                                style: { textAlign: "right" },
                            },
                            disabled: this.props.disabledInput
                        }}
                    ></TextField>
                </FormControl>
            </div>
        );
    }
}

export default BaseInfoInput;