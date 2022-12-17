import React from 'react';
import BaseInfoInput from './BaseInfoInput';

class NatlPensionCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            natlPensionRate : 0.045,
            natlPensionLowLimitMon : 350000,
            natlPensionHighLimitMon : 5530000
        };
        this.handleChange = this.handleChange.bind(this);
      }

    handleChange(event) {

    }

    render() {

        const taxableSalary = isNaN(this.props.taxableSalary) ? 0 : this.props.taxableSalary;
        const natlPensionTargetMon = taxableSalary < this.state.natlPensionLowLimitMon ? this.state.natlPensionLowLimitMon 
                                      : taxableSalary > this.state.natlPensionHighLimitMon ? this.state.natlPensionHighLimitMon : taxableSalary;

        const natlPensionAmount = taxableSalary === 0 ? 0 : Math.floor((natlPensionTargetMon * this.state.natlPensionRate).toFixed(0) / 10) * 10;

        return (
            <div className="formControl">
                <BaseInfoInput title="국민연금" id="natlPensionAmount" value={natlPensionAmount} disabledInput={true} ></BaseInfoInput>
            </div>
        );
    }
}

export default NatlPensionCalculator;