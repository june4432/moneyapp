import React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

class BaseInfoInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
      }

    handleChange(event) {
        this.props.onNumberChange(event.target.value.replace(/[^0-9]/g, ''));

    }

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