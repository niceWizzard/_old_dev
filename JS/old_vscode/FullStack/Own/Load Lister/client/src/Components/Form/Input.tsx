import { inputs } from '../../types'

export interface InputProps extends inputs {
    setData?: (value: any, name: string) => void
    data: any
}

const Input: React.FC<InputProps> = ({ type = "text", placeholder, className, required = false, setData, name, data }) => {

    const onChange = (e: any) => {
        if (type === 'number') {
            if (parseInt(e.target.value) < 0) {
                return false
            }
        }
        setData && setData(e.target.value, name)
    }
    return (
        <input type={type} placeholder={placeholder} className={className} required={required}
            onChange={onChange} value={data[name]}
            min={0}
        />
    );
}

export default Input;