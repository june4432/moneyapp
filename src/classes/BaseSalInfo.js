import * as React from 'react';
import BaseInfoInput from './BaseInfoInput';
import taxTable from '../tax_table.json';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TaxCalculator from './TaxCalculator';
import NatlPensionCalculator from './NatlPensionCalculator';
import HealthInsuranceCalculator from './HealthInsuranceCalculator';
import HiringInsuranceCalculator from './HiringInsuranceCalculator';



class BaseSalInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            taxTable : taxTable,
            natlPensionRate : 0.045,
            healthInsuranceRate : 0.03495,
            longTermCareInsuranceRate : 0.1227,
            hiringInsuranceRate : 0.009,
            totalSalary : 0,
            nonTaxableSalary : 0,
            familyCount : 1,
            child7to20Count : 0,
            taxRate : 100,
            taxableSalary : 0,
            salaryExceed10000 : 0,
            natlPensionAmount : 0,
            healthInsuranceAmount : 0,
            longTermCareInsuranceAmount : 0,
            hiringInsuranceAmount : 0,
            incomeTaxAmount : 0,
            localIncomeTaxAmount : 0,
            deductedAmount : 0,
            actualMoney : 0
        };
        this.handleChange_totalSalary = this.handleChange_totalSalary.bind(this);
        this.handleChange_nonTaxableSalary = this.handleChange_nonTaxableSalary.bind(this);
        this.handleChange_familyCount = this.handleChange_familyCount.bind(this);
        this.handleChange_child7to20Count = this.handleChange_child7to20Count.bind(this);
        this.handleChange_taxRate = this.handleChange_taxRate.bind(this);
        this.handleChange_calculateMoney = this.handleChange_calculateMoney.bind(this);
    }

    handleChange_totalSalary(totalSalary){
        this.setState({totalSalary:totalSalary
                      ,taxableSalary:totalSalary-this.state.nonTaxableSalary});
    }

    handleChange_nonTaxableSalary(nonTaxableSalary){
        this.setState({nonTaxableSalary:nonTaxableSalary
                      ,taxableSalary:this.state.totalSalary-nonTaxableSalary});
    }

    handleChange_familyCount(familyCount){
        this.setState({familyCount});
    }

    handleChange_child7to20Count(child7to20Count){
        this.setState({child7to20Count});
    }

    handleChange_taxRate(event){
        this.setState({"taxRate":event.target.value});
    }

    handleChange_calculateMoney(event){
        event.preventDefault();
        
        let taxableSalary = this.state.taxableSalary;

    }

    setStateAmount = (deductType, deductAmount) => {
        console.log(deductType + " => " + deductAmount);

        //this.setState({deductAmount});
    }

    render() {
        const totalSalary = this.props.totalSalary == NaN ? 0 : this.state.totalSalary;
        const nonTaxableSalary = this.props.nonTaxableSalary == NaN ? 0 : this.state.nonTaxableSalary;
        const familyCount = this.props.familyCount == NaN ? 0 : this.state.familyCount;
        const child7to20Count = this.props.child7to20Count == NaN ? 0 : this.state.child7to20Count;
        const taxRate = this.props.taxRate == NaN ? 0 : this.state.taxRate;
        const taxableSalary = this.state.taxableSalary;
        const deductAmount = (this.state.incomeTaxAmount);
        console.log("deductedAmount : " + deductAmount);
        return (
            <Box>
                <Toolbar />
                <div>
                    <div>
                        <fieldset>
                            <legend>기본정보를 입력하세요.</legend>
                            <BaseInfoInput title="월급여" id="totalSalary" value={totalSalary} onNumberChange={this.handleChange_totalSalary} disabledInput={false}></BaseInfoInput>
                            <BaseInfoInput title="비과세" id="nonTaxableSalary" value={nonTaxableSalary} onNumberChange={this.handleChange_nonTaxableSalary} disabledInput={false} ></BaseInfoInput>
                            <BaseInfoInput title="과세대상금액" value={taxableSalary}disabledInput={true} ></BaseInfoInput>
                            <BaseInfoInput title="부양가족수" id="familyCount" value={familyCount} onNumberChange={this.handleChange_familyCount} disabledInput={false} ></BaseInfoInput>
                            <BaseInfoInput title="7~20세 자녀수" id="child7to20Count" value={child7to20Count} onNumberChange={this.handleChange_child7to20Count} disabledInput={false} ></BaseInfoInput>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">원천징수세율</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="taxRate"
                                    value={taxRate}
                                    label="원천징수세율"
                                    onChange={this.handleChange_taxRate}
                                >
                                    <MenuItem value={80}>80%</MenuItem>
                                    <MenuItem value={100}>100%</MenuItem>
                                    <MenuItem value={120}>120%</MenuItem>
                                </Select>
                            </FormControl>
                        </fieldset>
                    </div>
                    <Button 
                        className="initButton" 
                        variant="contained" 
                        onClick={this.handleChange_calculateMoney}
                        size="large"
                        color="warning"
                    >초기화</Button>
                    <Button 
                        className="calcButton" 
                        variant="contained" 
                        onClick={this.handleChange_calculateMoney}
                        size="large"
                    >계산하기</Button>
                    <div>
                        <fieldset>
                            <legend>공제금액</legend>
                            <TaxCalculator 
                                taxableSalary={taxableSalary}
                                familyCount={familyCount}
                                child7to20Count={child7to20Count}
                                taxRate={taxRate}
                                setStateAmount={this.setStateAmount}
                            ></TaxCalculator>
                            <NatlPensionCalculator 
                                taxableSalary={taxableSalary}
                                setStateAmount={this.setStateAmount}
                            ></NatlPensionCalculator>
                            <HealthInsuranceCalculator 
                                taxableSalary={taxableSalary}
                                setStateAmount={this.setStateAmount}
                            ></HealthInsuranceCalculator>
                            <HiringInsuranceCalculator 
                                taxableSalary={taxableSalary}
                                setStateAmount={this.setStateAmount}
                            ></HiringInsuranceCalculator>
                        </fieldset>
                        {/* <fieldset>
                            <legend>요약</legend>
                            <BaseInfoInput title="공제액합계" id="deductedAmount" value={deductedAmount} onNumberChange={this.handleChange_taxRate} disabledInput={true} ></BaseInfoInput>
                            <BaseInfoInput title="실지급액" id="actualMoney" value={actualMoney} onNumberChange={this.handleChange_taxRate} disabledInput={true} ></BaseInfoInput>
                        </fieldset> */}
                    </div>
                </div>
            </Box>
        );
    }
 }

export default BaseSalInfo;
