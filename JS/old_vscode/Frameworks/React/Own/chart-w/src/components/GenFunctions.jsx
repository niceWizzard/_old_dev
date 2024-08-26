

export const fetchData = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export const putData = async (url, toPut) => {
    await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(toPut)
    })
}

export const setChartDataFunction = async (setChartData, chartData, url) => {
    const res = await fetchData(url)
    setChartData({
        labels: getObjectName(res),
        datasets: [{
            ...chartData.datasets[0],
            data: getObjectValue(res),
            backgroundColor: getObjectNameColor(res),
        }]
    })
}


export function getObjectNameColor(_object) {
    const output = [];
    const amount = 230;
    for (let key in _object) {
        output.push(`rgba(${Math.floor(Math.random() * amount + 1)}, ${Math.floor(Math.random() * amount + 1)}, ${Math.floor(Math.random() * amount + 1)})`)
    }
    return output;
}

export function getObjectName(_object) {
    const output = []
    for (let key in _object) {
        output.push(key)
    }
    return output;
}

export function addSpaceToArrayData(_array) {
    const output = [];
    for (let item of _array) {
        const hm = item.slice(0, 2) + ' ' + item.slice(2)
        output.push(hm)
    }
    return output;
}

export function getObjectValue(_object) {
    const output = [];
    for (let data in _object) {
        output.push(_object[data])
    }
    return output
}








