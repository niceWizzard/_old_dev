
function SortButton({ handleSortChange, ...props }) {

    const handleChange = (target) => {
        handleSortChange(target)
    }

    return (
        <select name="sort" className="sort-button bg-warning"
            onChange={e => handleChange(e.target)}
        >
            <option value="sort by">Sort by....</option>
            <option >Finished</option>
            <option  >Due date</option>
            <option >Created date</option>
        </select>


    )
}





export default SortButton;





