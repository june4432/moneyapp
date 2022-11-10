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
        console.log(event.target.value);
        this.setState({"taxRate":event.target.value});
    }

    handleChange_calculateMoney(event){
        event.preventDefault();
        
        let taxableSalary = this.state.taxableSalary;
        const taxPeriodArray = this.state.taxTable['taxtable'].filter(function(elem){
            return (taxableSalary < elem.maximum && taxableSalary >= elem.minimum)
        });

        //1천 초과 소득일 경우 1천에 해당하는 세금
        const taxOver100Million = taxableSalary > 10000000 ? 
                                    Number(taxPeriodArray[0].defaultTaxAmount)
                                    + Math.ceil(((Number(taxableSalary) - Number(taxPeriodArray[0].minimum)-1) * Number(taxPeriodArray[0].salaryAdjustRate) * Number(taxPeriodArray[0].taxRate))/10)*10 : 0;

        //총부양가족수
        const totalFamilyCount = Number(this.state.familyCount) + Number(this.state.child7to20Count);
        
        //부양가족수에 따른 세액
        const taxByFamilyCount = totalFamilyCount > 11 ? Number(taxPeriodArray[0].tax[10]) - ((Number(taxPeriodArray[0].tax[9])-Number(taxPeriodArray[0].tax[10])) * (totalFamilyCount - 11))
                                    : taxPeriodArray[0].tax[totalFamilyCount-1];

        //소득세 총합        
        const incomeTaxAmount = (taxOver100Million + taxByFamilyCount) * (this.state.taxRate / 100 );
        
        //근로주민세
        const localIncomeTaxAmount = Math.floor(incomeTaxAmount * 0.1 / 10) * 10;

        //연금 및 보험료, 공제금액 총액
        const natlPensionAmount = Math.floor(taxableSalary * this.state.natlPensionRate / 10) * 10;
        const healthInsuranceAmount = Math.floor(taxableSalary * this.state.healthInsuranceRate / 10) * 10;
        const longTermCareInsuranceAmount = Math.floor(healthInsuranceAmount * this.state.longTermCareInsuranceRate / 10) * 10;
        const hiringInsuranceAmount = Math.floor(taxableSalary * this.state.hiringInsuranceRate / 10) * 10;
        const deductedAmount = (incomeTaxAmount
                                + localIncomeTaxAmount
                                + natlPensionAmount
                                + healthInsuranceAmount
                                + longTermCareInsuranceAmount
                                + hiringInsuranceAmount)

        //실지급금액                                
        const actualMoney = this.state.totalSalary - deductedAmount;

        //ajax 혹은 다른 펑션을 타고 와서 소득세 주민세 보험료를 계산한 값을 리턴하고 setState를 통해 처리하도록 한다.
        this.setState({
            incomeTaxAmount : incomeTaxAmount,
            localIncomeTaxAmount : localIncomeTaxAmount,
            natlPensionAmount : natlPensionAmount,
            healthInsuranceAmount : healthInsuranceAmount,
            longTermCareInsuranceAmount : longTermCareInsuranceAmount,
            hiringInsuranceAmount : hiringInsuranceAmount,
            deductedAmount : deductedAmount,
            actualMoney : actualMoney
        })
    }

    render() {
        const totalSalary = this.state.totalSalary;
        const nonTaxableSalary = this.state.nonTaxableSalary;
        const familyCount = this.state.familyCount;
        const child7to20Count = this.state.child7to20Count;
        const taxRate = this.state.taxRate;
        const taxableSalary = this.state.taxableSalary;
        const incomeTaxAmount = this.state.incomeTaxAmount
        const localIncomeTaxAmount = this.state.localIncomeTaxAmount
        const natlPensionAmount = this.state.natlPensionAmount;
        const healthInsuranceAmount = this.state.healthInsuranceAmount;
        const longTermCareInsuranceAmount = this.state.longTermCareInsuranceAmount;
        const hiringInsuranceAmount = this.state.hiringInsuranceAmount;
        const deductedAmount = this.state.deductedAmount;
        const actualMoney = this.state.actualMoney;
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
                        className="calcButton" 
                        variant="contained" 
                        fullWidth={true}
                        onClick={this.handleChange_calculateMoney}
                    >계산하기</Button>
                    <div>
                        <fieldset>
                            <legend>계산결과</legend>
                            <fieldset>
                                <legend>공제금액</legend>
                                <BaseInfoInput title="소득세" id="incomeTaxAmount" value={incomeTaxAmount} onNumberChange={this.handleChange_taxRate} disabledInput={true} ></BaseInfoInput>
                                <BaseInfoInput title="지방소득세" id="localIncomeTaxAmount" value={localIncomeTaxAmount} onNumberChange={this.handleChange_taxRate} disabledInput={true} ></BaseInfoInput>
                                <BaseInfoInput title="국민연금" id="natlPensionAmount" value={natlPensionAmount} onNumberChange={this.handleChange_taxRate} disabledInput={true} ></BaseInfoInput>
                                <BaseInfoInput title="건강보험" id="healthInsuranceAmount" value={healthInsuranceAmount} onNumberChange={this.handleChange_taxRate} disabledInput={true} ></BaseInfoInput>
                                <BaseInfoInput title="장기요양보험" id="longTermCareInsuranceAmount" value={longTermCareInsuranceAmount} onNumberChange={this.handleChange_taxRate} disabledInput={true} ></BaseInfoInput>
                                <BaseInfoInput title="고용보험" id="hiringInsuranceAmount" value={hiringInsuranceAmount} onNumberChange={this.handleChange_taxRate} disabledInput={true} ></BaseInfoInput>
                            </fieldset>
                            <fieldset>
                                <legend>요약</legend>
                                <BaseInfoInput title="공제액합계" id="deductedAmount" value={deductedAmount} onNumberChange={this.handleChange_taxRate} disabledInput={true} ></BaseInfoInput>
                                <BaseInfoInput title="실지급액" id="actualMoney" value={actualMoney} onNumberChange={this.handleChange_taxRate} disabledInput={true} ></BaseInfoInput>
                            </fieldset>
                        </fieldset>
                        
                    </div>
                </div>
            </Box>
        );
    }
 }

export default BaseSalInfo;
