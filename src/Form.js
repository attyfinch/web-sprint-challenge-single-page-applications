import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from 'yup';

const initialFormValues = {
    name: "",
    size: "",
    pepperoni: false,
    mushrooms: false,
    olives: false,
    onions: false,
    instructions: ""
}

const initialFormErrors = {
    name: "",
    size: "",
    pepperoni: "",
    mushrooms: "",
    olives: "",
    onions: "",
    instructions: ""
}

const formSchema = yup.object().shape({
    name: yup.string().trim().required('name must be at least 2 characters').min(2, 'name must be at least 2 characters'),
    size: yup.string().oneOf(['Small','Medium', 'Large', 'Xtra Large'], "Must choose size"),
    pepperoni: yup.boolean(),
    mushrooms: yup.boolean(),
    olives: yup.boolean(),
    onions: yup.boolean(),
    instructions: yup.string().trim()
})

const initialOrders = [];
const initialDisabled = true;

const Form = () => {

    //   Fill out #pizza-form, submit #pizza-form with data to https://reqres.in/api/orders (55 ms)

    const [values, setValues] = useState(initialFormValues);
    const [errors, setErrors] = useState(initialFormErrors);
    const [orders, setOrders] = useState(initialOrders);
    const [disabled, setDisabled] = useState(initialDisabled);

    const validate = (name, value) => {
        yup.reach(formSchema, name)
          .validate(value)
          .then(() => setErrors({ ...errors, [name]: ""}))
          .catch(err => setErrors({ ...errors, [name]: err.errors[0] }))
      }
    
    const change = e => {
        const {name, value, checked, type} = e.target;
        validate(name, value)
        const valueToUse = type === "checkbox" ? checked : value
        setValues({...values, [name]: valueToUse})   
    }

    const submit = e => {
        e.preventDefault();
        
        axios.post('https://reqres.in/api/orders', values)
            .then(res => {
                setOrders([res.data, ...orders])
            }) .catch(err => console.error(err))
            .finally(() => setValues(initialFormValues))        
    }

    useEffect(() => {
        formSchema.isValid(values).then(valid => setDisabled(!valid))
      }, [values])

    //   verifies thata form submission data is correctly being added to the orders array
      useEffect(() => {
        console.log(orders)
      }, [orders])  

    return (
        
        <div>
            <form onSubmit={submit} id="pizza-form">
                <label>Name
                    <input
                    id="name-input"
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={change}
                    />    
                </label>
                <br></br>
                <label>Size
                    <select name="size" value={values.size} onChange={change} >
                        <option value="" id="size-dropdown">-choose size-</option>
                        <option value="Small" id="size-dropdown">Small</option>
                        <option value="Medium" id="size-dropdown">Medium</option>
                        <option value="Large" id="size-dropdown">Large</option>
                        <option value="Xtra Large" id="size-dropdown">Xtra Large</option>
                    </select>
                </label>
                <br></br>
                <div>Choose your toppings</div>
                <br></br>
                <label>Pepperoni
                    <input
                    type="checkbox"
                    name="pepperoni"
                    checked={values.pepperoni}
                    onChange={change}
                    />
                </label>
                <label>Mushrooms
                    <input
                    type="checkbox"
                    name="mushrooms"
                    checked={values.mushrooms}
                    onChange={change}
                    />
                </label>
                <label>Olives
                    <input
                    type="checkbox"
                    name="olives"
                    checked={values.olives}
                    onChange={change}
                    />
                </label>
                <label>Onions
                    <input
                    type="checkbox"
                    name="onions"
                    checked={values.onions}
                    onChange={change}
                    />
                </label>
                <br></br>
                <label>Special Instructions
                    <input
                    id="special-text"
                    type="text"
                    name="instructions"
                    value={values.instructions}
                    onChange={change}
                    />
                </label>
                <br></br>
                
                <button id="order-button" disabled={disabled}>Order</button>

                <div>{errors.name}</div>

            </form>
        </div>
    )

}





export default Form;