

export type action = {
    type: 'username' | 'password' | 'repassword' | 'isloading'
    payload: any
}

export type selection = {
    name: string,
    className?: string
    optionArray: option[]
    initialValue?: string
}

export type option = {
    value: string
}

export type inputs = {
    type?: "text" | 'password' | 'email' | 'number'
    placeholder?: string
    className?: string
    required?: boolean
    name: string
    initialValue?: string
}

export type Utang = {
    debtor: string,
    creditor: string
    amount: number
    dateOwed: Date
    datePaid: Date | null
    isPaid: false
}

export type User = {
    username: string,
    smart: {
        profit: number
        balance: number
    }
    globe: {
        profit: number
        balance: number
    }
    utang: []
    list: string
    createdAt: string
    updatedAt: string
    _id: string
    multiplier: {
        smart: number,
        globe: number,
    }
}

export type receipt = {
    amount: number
    buyer: string
    username: string
    date: Date
    _id: string
    carrier: 'Globe' | 'Globe'
}


