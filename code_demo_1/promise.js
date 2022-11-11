function getData(data) {
    return new Promise((resolve, reject)=> {
        setTimeout(() => {
            // resolve(data)
            // reject(data)
            throw new Error('err')
        }, 1000);
    })
}

getData(1).then((res) => {console.log(res, 'success')},(err) => {console.log(err, 'reject')}).catch((err) => {console.log(err,'err')})