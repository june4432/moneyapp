import React from 'react';
import BaseInfoInput from './BaseInfoInput';
import taxTable from '../tax_table.json';

class TaxCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taxTable : taxTable,
            incomeTaxAmount : 0,
            localIncomeTaxAmount : 0

        };
        this.handleChange = this.handleChange.bind(this);
      }

    handleChange(event) {
        console.log(event);
        //this.props.setStateAmount("incomeTaxAmount", this.state.incomeTaxAmount);
    }

    render() {

        const taxableSalary = isNaN(this.props.taxableSalary) ? 0 : this.props.taxableSalary;
        const familyCount = isNaN(this.props.familyCount) ? 0 : this.props.familyCount;
        const child7to20Count = isNaN(this.props.child7to20Count) ? 0 : this.props.child7to20Count;
        const taxRate = this.props.taxRate;
        const taxPeriodArray = this.state.taxTable['taxtable'].filter(function(elem){
            return (taxableSalary < elem.maximum && taxableSalary >= elem.minimum)
        });

        //1천 초과 소득일 경우 1천에 해당하는 세금
        const taxOver100Million = taxableSalary > 10000000 ? 
                                    Number(taxPeriodArray[0].defaultTaxAmount)
                                    + Math.ceil(((Number(taxableSalary) - Number(taxPeriodArray[0].minimum)-1) * Number(taxPeriodArray[0].salaryAdjustRate) * Number(taxPeriodArray[0].taxRate))/10)*10 : 0;

        //총부양가족수
        const totalFamilyCount = Number(familyCount) + Number(child7to20Count);
        
        //부양가족수에 따른 세액
        const taxByFamilyCount = totalFamilyCount > 11 ? Number(taxPeriodArray[0].tax[10]) - ((Number(taxPeriodArray[0].tax[9])-Number(taxPeriodArray[0].tax[10])) * (totalFamilyCount - 11))
                                    : taxPeriodArray[0].tax[totalFamilyCount-1];

        //소득세 총합        
        const incomeTaxAmount = (taxOver100Million + taxByFamilyCount) * ( taxRate / 100 );
        
        //근로주민세
        const localIncomeTaxAmount = Math.floor(incomeTaxAmount * 0.1 / 10) * 10;

        // if(this.state.incomeTaxAmount != incomeTaxAmount){
        //     this.setState({"incomeTaxAmount":incomeTaxAmount});
        // }
        // if(this.state.localIncomeTaxAmount != localIncomeTaxAmount){
        //     this.setState({"localIncomeTaxAmount":localIncomeTaxAmount});
        // }
        
        //this.props.setStateAmount("incomeTaxAmount", incomeTaxAmount);

        return (
            <div className="formControl">
                <BaseInfoInput title="소득세" id="incomeTaxAmount" value={incomeTaxAmount} onNumberChange={this.handleChange} disabledInput={true} ></BaseInfoInput>
                <BaseInfoInput title="지방소득세" id="localIncomeTaxAmount" value={localIncomeTaxAmount} onNumberChange={this.handleChange} disabledInput={true} ></BaseInfoInput>
            </div>
        );
    }
}

export default TaxCalculator;