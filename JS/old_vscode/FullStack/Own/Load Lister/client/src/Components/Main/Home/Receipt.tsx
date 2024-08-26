import { Link } from "react-router-dom";
import { receipt } from "../../../types";
import { capitalizeFirst } from '../../../functions'
import '../../../css/Receipts.css'


export interface ReceiptProps {
    receipt: receipt
}

const Receipt: React.FC<ReceiptProps> = ({ receipt }) => {
    const { amount, username, date, buyer, _id, carrier } = receipt

    const getDate = (date: Date) => {
        const d = new Date(date)

        const min = d.getMinutes()
        const hour = d.getHours()
        const month = d.toLocaleString('default', { month: 'long' });
        const day = d.getDate()
        const year = d.getFullYear()
        const h = Math.abs(hour - 12)
        const hours = (hour < 10 ? '0' + hour : h)

        return `${hours}:${min < 10 ? '0' + min : min}, ${day} ${month} ${year}`
    }


    return (
        <div className="receipt" >
            <div className="info">
                <div className="info-group">
                    <p className="seller"  >Seller:</p>
                    <p> {username}</p>
                </div>
                <div className="info-group">
                    <p className="buyer" >Buyer:</p>
                    <p> {buyer}</p>
                </div>
                <div className="info-group">
                    <p className="date" >Date:</p>
                    <p> {getDate(date)} </p>
                </div>
                <div className="info-group">
                    <p className="carrier" >Carrier:</p>
                    <p> {capitalizeFirst(carrier)}</p>
                </div>
                <div className="info-group">
                    <p className="amount" >Amount:</p>
                    <p> ₱{amount}</p>
                </div>
            </div>
            <Link to={`/lists/edit/${_id}`} className="btn btn-edit"
            >Edit</Link>
        </div>
    );
}

export default Receipt;