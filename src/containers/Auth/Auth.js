import React, { Component } from 'react'
import classes from './Auth.css'
import Button from '../../components/Ui/Button/Button'
import Input from '../../components/Ui/Input/Input';
import axios from 'axios'
export default class Auth extends Component {

    state = {
        ifFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMesage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMesage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    validateEmail(email) {
        const re = /^(([^<>()\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    validateControl(value, validation){
        if(!validation) {
            return true;
        }

        let isValid = true;

        if(validation.required){
            isValid = value.trim() !== '' && isValid
        }

        if(validation.email){
            isValid = this.validateEmail(value) && isValid
        }

        if(validation.minLength){
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }
    
    onChangeHandler = (e, contr) => {

        const formControls = {...this.state.formControls}
        const control = {...formControls[contr]}
        control.value =  e.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)
        
        formControls[contr] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid= formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid 
        })  
    }
    renderInputs = () => {
        return Object.keys(this.state.formControls).map((contr , index)=>{
            const control = this.state.formControls[contr]
            return (
                <Input 
                    key={control + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMesage={control.errorMesage}
                    onChange={(e)=>{
                        this.onChangeHandler(e, contr)
                    }}
                />
            )
        })
    }
    LoginHandler = async () => {
        const authData = {
            email:  this.state.formControls.email.value,
            password:  this.state.formControls.password.value,
            returnSecureToken: true
        }
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAoAnCptHi4eAfk3ogUNxQBuoajek4Xlrs',authData)
            
            console.log(response);
            
        } catch (error) {
            console.log(error);   
        }
    }
    registerHandler = async () => {
        const authData = {
            email:  this.state.formControls.email.value,
            password:  this.state.formControls.password.value,
            returnSecureToken: true
        }
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAoAnCptHi4eAfk3ogUNxQBuoajek4Xlrs',authData)
            

            console.log(response);
            
        } catch (error) {
            console.log(error);   
        }
    }
    submitHandler = (e) => {
        e.preventDefault();
    }
    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        {this.renderInputs()}
                        <Button type="success" onClick={this.loginHandler} disabled={!this.state.isFormValid}>Войти</Button>
                        <Button type="primary" onClick={this.registerHandler} disabled={!this.state.isFormValid}>Зарегистрироваться</Button>
                    </form>
                </div>
            </div>
        )
    }
}
