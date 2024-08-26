import { useContext } from "react";
import { USERContext } from "../../../contexts";
import UserAuth from "../../customHooks/UserAuth";
import Navbar from "../Navbar";
import Receipts from "./Receipts";
import '../../../css/Homepage.css'
import { Helmet } from "react-helmet-async";

export interface HomepageProps {

}

const Homepage: React.FC<HomepageProps> = () => {


    const USER = useContext(USERContext)

    return (
        <>
            <Helmet>
                <title>Welcome - Load Lister</title>
                <meta name="description" content="Welcome to the best Load Listing website in the internet" />
                <link rel="canonical" href="http://localhost:3000/" />
            </Helmet>
            <UserAuth>
                <Navbar />
                <div className="container">
                    <div className="user-info">
                        <div className="balance">
                            <h1>Smart Balance:  ₱{USER ? parseFloat((USER?.smart.balance)?.toFixed(3).toString()!) : 'Loading'}</h1>
                            <h1>Globe Balance:  ₱{USER ? parseFloat((USER?.globe.balance)?.toFixed(3).toString()!) : 'Loading'}</h1>
                        </div>
                        <h1 className="profit">Profit: ₱{USER && USER?.smart.profit + USER?.globe.profit} </h1>
                    </div>
                    <Receipts />
                </div>

            </UserAuth>
        </>
    );
}

export default Homepage;