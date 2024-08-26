import { selection } from "../../types";

export interface SelectionProps extends selection {
    data: any
    setData: (value: string, name: string) => void
}

const Select: React.FC<SelectionProps> = ({ optionArray, className, data, name, setData }) => {


    const onChange = (e: any) => {
        setData(e.target.value, name)
    }



    return (
        <select className={className} value={data[name]}
            onChange={onChange}
        >
            {optionArray.map((op, index) => {
                return <option value={op.value.toLocaleLowerCase()} key={index} >{op.value}</option>
            })}
        </select>
    );
}

export default Select;