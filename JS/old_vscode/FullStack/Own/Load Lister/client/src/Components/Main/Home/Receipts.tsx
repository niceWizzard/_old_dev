import React, { Suspense } from "react";
import { receipt } from "../../../types";
import useAxios from "../../customHooks/useAxios";

export interface ReceiptsProps {

}

const Receipt = React.lazy(() => (import('./Receipt')))


const Receipts: React.FC<ReceiptsProps> = () => {

    // const { data: receipts, isLoading } = useAxios<receipt[]>({ url: '/lists', method: 'GET' })

    const receipts: receipt[] = [{
        amount: 22,
        buyer: 'Test Buyer',
        username: 'Test User',
        date: new Date(),
        _id: 'Test Id',
        carrier: 'Globe'
    },
    {
        amount: 22,
        buyer: 'Test Buyer',
        username: 'Test User',
        date: new Date(),
        _id: 'Test Id',
        carrier: 'Globe'
    },
    {
        amount: 22,
        buyer: 'Test Buyer',
        username: 'Test User',
        date: new Date(),
        _id: 'Test Id',
        carrier: 'Globe'
    },
    {
        amount: 22,
        buyer: 'Test Buyer',
        username: 'Test User',
        date: new Date(),
        _id: 'Test Id',
        carrier: 'Globe'
    },

    ]

    return (
        <>
            <h1>Receipts</h1>
            <div className="receipts-container">
                {
                    receipts ?
                        receipts?.map((re, index) => {
                            return (<Suspense fallback={<div>Loading...</div>} key={index}>
                                <Receipt receipt={re} key={index} />
                            </Suspense>)
                        }) :
                        // isLoading && <div>Getting List...</div>
                        <div>Getting List...</div>
                } {receipts && receipts.length === 0 && <div>No list available. Create one!</div>}
            </div>
        </>
    );
}

export default Receipts;