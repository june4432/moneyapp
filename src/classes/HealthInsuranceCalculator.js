import React from 'react';
import ReactDOM from 'react-dom/client';
import TextField from '@mui/material/TextField';
import BaseInfoInput from './BaseInfoInput';
import taxTable from '../tax_table.json';

class HealthInsuranceCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            healthInsuranceRate : 0.03495,
            longTermCareInsuranceRate : 0.1227,
            healthInsuranceLowLimitMon : 279256,
            healthInsuranceHighLimitMon : 104536481
        };
        this.handleChange = this.handleChange.bind(this);
      }

    handleChange(event) {

    }

    render() {

        const taxableSalary = this.props.taxableSalary == NaN ? 0 : this.props.taxableSalary;
        const healthInsuranceTargetMon = taxableSalary < this.state.healthInsuranceLowLimitMon ? this.state.healthInsuranceLowLimitMon
                                          : taxableSalary > this.state.healthInsuranceHighLimitMon ? this.state.healthInsuranceHighLimitMon : taxableSalary;


        const healthInsuranceAmount = taxableSalary == 0 ? 0 : Math.floor((healthInsuranceTargetMon * this.state.healthInsuranceRate).toFixed(0) / 10) * 10;
        const longTermCareInsuranceAmount = taxableSalary == 0 ? 0 : Math.floor((healthInsuranceAmount * this.state.longTermCareInsuranceRate).toFixed(0) / 10) * 10;
        
        return (
            <div className="formControl">
                <BaseInfoInput title="건강보험" id="healthInsuranceTargetMon" value={healthInsuranceAmount} disabledInput={true} ></BaseInfoInput>
                <BaseInfoInput title="장기요양보험" id="healthInsuranceAmount" value={longTermCareInsuranceAmount} disabledInput={true} ></BaseInfoInput>
            </div>
        );
    }
}

export default HealthInsuranceCalculator;