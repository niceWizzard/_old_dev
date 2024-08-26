import React, { FormEvent, useState } from 'react'
import Input from './Input'
import { inputs, selection } from '../../types'
import Select from './Selection'


export interface FormProps {
    arrayInputs: inputs[]
    arraySelect?: selection[]
    onSubmit?: (e: FormEvent, data: any) => any
    className?: string
    msg?: string | null
    submitValue?: string
}


const Form: React.FC<FormProps> = ({ arrayInputs, onSubmit, className, msg: message = null, submitValue = "Submit", arraySelect }) => {
    const [data, doData] = useState<any>(arrayInputs.reduce((o, key) => ({ ...o, [key.name]: key.initialValue || '' }), {}))
    const [selectdata, doSelectData] = useState<any>(arraySelect && arraySelect.reduce((o, key) => ({ ...o, [key.name]: key.initialValue || '' }), {}))
    const setData = (value: any, name: string) => {
        doData({ ...data, [name]: value })
    }

    const setSelectData = (value: string, name: string) => {
        doSelectData({ ...selectdata, [name]: value })
    }


    return (
        <>
            {message && <p>{message}</p>}
            <form
                onSubmit={(e) => onSubmit && onSubmit(e, { ...data, ...selectdata })} className={className}
            >
                {arrayInputs.map((arInputs: inputs, index: number) => {
                    const { type, className, placeholder, required, name } = arInputs
                    return <Input type={type} className={className} placeholder={placeholder} required={required} key={index} setData={setData}
                        name={name} data={data}
                    />
                })}
                {
                    arraySelect && arraySelect.map((s, index) => {
                        return <Select optionArray={s.optionArray} key={index} className={s.className} data={selectdata} name={s.name}
                            setData={setSelectData} />
                    })
                }
                <input type="submit" value={submitValue} />
            </form>
        </>
    )
}

export default Form
