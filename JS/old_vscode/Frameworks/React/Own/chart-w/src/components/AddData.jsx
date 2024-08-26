import { useState } from "react";

const AddData = ({ handleAddData, setIsAdding, isAdding, inputData, setInputData, ...props }) => {

    const handleInputDataChange = (e) => {
        if (e.target.value.length < 5) {
            setInputData(e.target.value)
        }
    }

    return (
        <>
            <button
                onClick={() => setIsAdding(!isAdding)}
            >{!isAdding ? 'Add Data' : 'Close Window'} </button>

            {isAdding &&
                <form
                    onSubmit={handleAddData}
                >
                    <input type="number" placeholder="Label" value={inputData}
                        onChange={handleInputDataChange}
                    />

                    <input type="submit" value="Add" />
                </form>
            }
        </>
    );
}

export default AddData;