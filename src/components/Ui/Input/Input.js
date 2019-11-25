import React from 'react'
import classes from "./Input.css"

function ifInValid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

const Input = props => {
    const inputType = props.type || 'text'
    const cls = [classes.Input];
    const htmlFor = `${inputType}-${Math.random()}`

    if (ifInValid(props)) {
        cls.push(classes.invalid)
    }
    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input 
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />
            {
                ifInValid(props)
                    ? <span>{props.errorMesage || 'введите верное значение'}</span>
                    : null
            }
        </div>
    )
}


export default Input