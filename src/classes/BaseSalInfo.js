import * as React from 'react';
import BaseInfoInput from './BaseInfoInput';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import TaxCalculator from './TaxCalculator';
import NatlPensionCalculator from './NatlPensionCalculator';
import HealthInsuranceCalculator from './HealthInsuranceCalculator';
import HiringInsuranceCalculator from './HiringInsuranceCalculator';



class BaseSalInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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

    handleChange_familyCount(event){
        //this.setState({familyCount});
        console.log(event.target.value);
        this.setState({"familyCount":event.target.value});
    }

    handleChange_child7to20Count(event){
        //this.setState({child7to20Count});
        this.setState({"child7to20Count":event.target.value});
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
        const totalSalary = isNaN(this.state.totalSalary) ? 0 : this.state.totalSalary;
        const nonTaxableSalary = isNaN(this.state.nonTaxableSalary) ? 0 : this.state.nonTaxableSalary;
        const familyCount = isNaN(this.state.familyCount) ? 1 : this.state.familyCount;
        const child7to20Count = isNaN(this.state.child7to20Count) ? 0 : this.state.child7to20Count;
        const taxRate = isNaN(this.state.taxRate) ? 0 : this.state.taxRate;
        const taxableSalary = this.state.taxableSalary;
        const deductAmount = (this.state.incomeTaxAmount);
        return (
            <Box>
                <Toolbar />
                <div>
                    <div>
                        <fieldset>
                            <legend>??????????????? ???????????????.</legend>
                            <BaseInfoInput title="?????????" id="totalSalary" value={totalSalary} onNumberChange={this.handleChange_totalSalary} disabledInput={false}></BaseInfoInput>
                            <BaseInfoInput title="?????????" id="nonTaxableSalary" value={nonTaxableSalary} onNumberChange={this.handleChange_nonTaxableSalary} disabledInput={false} ></BaseInfoInput>
                            <BaseInfoInput title="??????????????????" value={taxableSalary}disabledInput={true} ></BaseInfoInput>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">???????????????</InputLabel>
                            <Select
                                    labelId="demo-simple-select-label"
                                    id="familyCount"
                                    value={familyCount}
                                    label="???????????????"
                                    onChange={this.handleChange_familyCount}
                                >
                                    <MenuItem value={1}>1???</MenuItem>
                                    <MenuItem value={2}>2???</MenuItem>
                                    <MenuItem value={3}>3???</MenuItem>
                                    <MenuItem value={4}>4???</MenuItem>
                                    <MenuItem value={5}>5???</MenuItem>
                                    <MenuItem value={6}>6???</MenuItem>
                                    <MenuItem value={7}>7???</MenuItem>
                                    <MenuItem value={8}>8???</MenuItem>
                                    <MenuItem value={9}>9???</MenuItem>
                                    <MenuItem value={10}>10???</MenuItem>
                                    <MenuItem value={11}>11???</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">7~20??? ?????????</InputLabel>
                            <Select
                                    labelId="demo-simple-select-label"
                                    id="child7to20Count"
                                    value={child7to20Count}
                                    label="7~20??? ?????????"
                                    onChange={this.handleChange_child7to20Count}
                                >
                                    <MenuItem value={0}>0???</MenuItem>
                                    <MenuItem value={1}>1???</MenuItem>
                                    <MenuItem value={2}>2???</MenuItem>
                                    <MenuItem value={3}>3???</MenuItem>
                                    <MenuItem value={4}>4???</MenuItem>
                                    <MenuItem value={5}>5???</MenuItem>
                                    <MenuItem value={6}>6???</MenuItem>
                                    <MenuItem value={7}>7???</MenuItem>
                                    <MenuItem value={8}>8???</MenuItem>
                                    <MenuItem value={9}>9???</MenuItem>
                                    <MenuItem value={10}>10???</MenuItem>
                                </Select>
                            </FormControl>
                            <BaseInfoInput title="7~20??? ?????????" id="child7to20Count" value={child7to20Count} onNumberChange={this.handleChange_child7to20Count} disabledInput={false} ></BaseInfoInput>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">??????????????????</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="taxRate"
                                    value={taxRate}
                                    label="??????????????????"
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
                    >?????????</Button>
                    <Button 
                        className="calcButton" 
                        variant="contained" 
                        onClick={this.handleChange_calculateMoney}
                        size="large"
                    >????????????</Button>
                    <div>
                        <fieldset>
                            <legend>????????????</legend>
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
                            <legend>??????</legend>
                            <BaseInfoInput title="???????????????" id="deductedAmount" value={deductedAmount} onNumberChange={this.handleChange_taxRate} disabledInput={true} ></BaseInfoInput>
                            <BaseInfoInput title="????????????" id="actualMoney" value={actualMoney} onNumberChange={this.handleChange_taxRate} disabledInput={true} ></BaseInfoInput>
                        </fieldset> */}
                    </div>
                </div>
            </Box>
        );
    }
 }

export default BaseSalInfo;
