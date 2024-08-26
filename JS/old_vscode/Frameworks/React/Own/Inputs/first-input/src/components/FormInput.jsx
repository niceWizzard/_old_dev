import React, { useState } from 'react';


function FormInput(props) {
    let { labelName } = props;


    const [inputType, setInputType] = useState(
        {
            inputType: props.inputType,
            isClicked: false,
        })

    const permanentInputType = props.inputType;

    const [input, setInput] = useState(
        {
            isFocused: false,
            inputValue: '',

        }
    );

    const [liValid, setLiValid] = useState(
        {
            email: [
                { 'Must be a valid email': 'warning' }
            ],
            password: [
                { 'Uppercase': 'warning' },
                { 'Special Character': 'warning' },
                { 'Number': 'warning' },
            ]
        }
    )


    const handleClearBtnClick = () => {
        const newValue = { ...input };
        newValue.inputValue = '';
        newValue.isFocused = false;

        setInput(newValue);

    }



    const handleInputValueChange = (e) => {
        const newValue = { ...input }
        newValue.inputValue = e.target.value
        newValue.isFocused = true;
        setInput(newValue)
    }

    const handleIsFocused = (_state) => {
        const newValue = { ...input };
        newValue.isFocused = _state;
        setInput(newValue);
    }




    const addClearBtn = () => {
        if (input.inputValue !== '') {
            return <button className="clear-btn btn btn-danger btn-sm"
                onClick={handleClearBtnClick}
            >x</button>
        }
    }

    const checkInputType = () => {
        if (permanentInputType === 'email') {
            handleEmailValidation(input);
        } else if (permanentInputType === 'password') {
            handlePasswordValidation(input)
        } else if (permanentInputType === 'text') {
            handleTextValidation(input);
        }
    }

    const handleTextValidation = ({ inputValue }) => {
        if (inputValue != '') {
            props.changeIsValid(true);
        } else props.changeIsValid(false);
    }

    const handleEmailValidation = ({ inputValue }) => {
        const newArr = { ...liValid }
        const regex = /[a-zA-Z0-9-_]+@[a-zA-Z]+\.[a-zA-Z]{2,5}/i
        const warning = 'warning';
        const success = 'success';
        if (regex.test(inputValue) === true) {
            const key = (getKey(newArr['email'][0]))
            newArr['email'][0][key] = success;
            props.changeIsValid(true);
            props.changeIsValid(true);

        }
        else {
            const key = (getKey(newArr['email'][0]))
            newArr['email'][0][key] = warning;
            props.changeIsValid(false);
            props.changeIsValid(false);



        }
        setLiValid(newArr);
    }

    const handlePasswordValidation = ({ inputValue }) => {
        let newArr = { ...liValid }
        const capital = /[A-Z]/;
        const number = /[0-9]/
        const special = /[!@#$%^&*(),.?":{}|<>]/g
        const warning = 'warning';
        const success = 'success';

        let index = 0

        if (capital.test(inputValue) === true) {
            const key = (getKey(newArr['password'][index]))
            newArr['password'][index][key] = success;
            props.changeIsValid(true);



        } else {
            const key = (getKey(newArr['password'][index]))
            newArr['password'][index][key] = warning;
            props.changeIsValid(false);




        }

        if (special.test(inputValue) === true) {
            index = 1;
            const key = (getKey(newArr['password'][index]))
            newArr['password'][index][key] = success;
            props.changeIsValid(true);



        } else {
            index = 1;
            const key = (getKey(newArr['password'][index]))
            newArr['password'][index][key] = warning;
            props.changeIsValid(false);


        }

        if (number.test(inputValue) === true) {
            index = 2;
            const key = (getKey(newArr['password'][index]))
            newArr['password'][index][key] = success;
            props.changeIsValid(true);



        } else {
            index = 2;
            const key = (getKey(newArr['password'][index]))
            newArr['password'][index][key] = warning;
            props.changeIsValid(false);


        }

        setLiValid(newArr)

    }

    const getKey = (_from) => {
        return Object.keys(_from);
    }

    const showInputInstruction = () => {
        if (permanentInputType !== 'text') {

            const liText = permanentInputType == 'email' ? liValid['email'] : liValid['password'];
            if (input.inputValue != '') {
                return (
                    <ul className=" container mx-5 align-self-center">
                        {
                            liText.map((_li, index) => {
                                const keys = Object.keys(_li)
                                const value = Object.values(_li);
                                return <li key={index} id={index} className={getLiClasses(value)}>{keys}</li>
                            })
                        }
                    </ul>
                )
            }
        }
    }

    const getLiClasses = (_class) => {
        let classes = 'sm m-2 font-weight-bold text-';
        classes += _class;
        return classes;
    }

    const showPasswordBtn = () => {
        if (input.inputValue !== '') {
            return (<p className="btn btn-primary btn-show-password "
                onClick={handleShowPasswordBtnClick}
            >{inputType.inputType === 'password' ? 'Show' : 'Hide'} Password</p>
            )
        }


    }

    const handleShowPasswordBtnClick = () => {
        const newArr = { ...inputType }
        newArr.isClicked = !newArr.isClicked;

        if (newArr.isClicked === true) newArr.inputType = 'text';
        else newArr.inputType = 'password';
        console.log(newArr.inputType)

        setInputType(newArr)
    }


    // Main Return 
    return (
        <>
            <div className="container mx-2 d-flex flex-column justify-content-start">
                <label className="w-50 h3">{labelName}</label>
                <div className="input-container position-relative mb-3 d-flex flex-column" >
                    <>
                        {addClearBtn()}
                    </>
                    <input
                        type={inputType.inputType} className="form-control mb-1" value={input.inputValue}
                        onFocus={() => handleIsFocused(true)}
                        onBlur={() => handleIsFocused(false)}
                        onChange={handleInputValueChange}
                        onKeyUp={checkInputType}
                    />
                    {permanentInputType === 'password' && showPasswordBtn()}
                    {showInputInstruction()}
                </div>
            </div>
        </>
    );
}




export default FormInput;

