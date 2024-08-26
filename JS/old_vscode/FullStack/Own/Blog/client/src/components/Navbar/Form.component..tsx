import React, { useRef } from "react";

export interface FormC {
    condition: boolean,
    getter: (e: any) => any
    formClass: string,
}

const FormComponent: React.FC<FormC> = ({ condition, getter, formClass }) => {

    const input = useRef<HTMLInputElement>(null);



    const onSubmit = (e: any) => {
        e.preventDefault();
        getter(input.current?.value)
    }

    return (
        <>
            {condition &&
                <form className={formClass}
                    onSubmit={onSubmit}
                >

                    <input ref={input} type="text" placeholder="Search" />
                    {<input className="btn-dark-hover" value="Search" type="submit" />}
                </form>
            }
        </>
    );
}

export default React.memo(FormComponent);