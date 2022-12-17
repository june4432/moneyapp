import React from 'react';
import BaseInfoInput from './BaseInfoInput';

class HiringInsuranceCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hiringInsuranceRate : 0.009,
            hiringInsuranceLowLimitMon : 279256,
            hiringInsuranceHighLimitMon : 104536481
        };
        this.handleChange = this.handleChange.bind(this);
      }

    handleChange(event) {

    }

    render() {

        const taxableSalary = isNaN(this.props.taxableSalary) ? 0 : this.props.taxableSalary;
        const hiringInsuranceTargetMon = taxableSalary < this.state.hiringInsuranceLowLimitMon ? this.state.hiringInsuranceLowLimitMon
                                          : taxableSalary > this.state.hiringInsuranceHighLimitMon ? this.state.hiringInsuranceHighLimitMon : taxableSalary;

        const hiringInsuranceAmount = taxableSalary === 0 ? 0 : Math.floor( (hiringInsuranceTargetMon * this.state.hiringInsuranceRate).toFixed(0) / 10) * 10;

        return (
            <div className="formControl">
                <BaseInfoInput title="고용보험" id="hiringInsuranceAmount" value={hiringInsuranceAmount} disabledInput={true} ></BaseInfoInput>
            </div>
        );
    }
}

export default HiringInsuranceCalculator;