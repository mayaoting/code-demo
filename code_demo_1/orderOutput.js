function outputNumber(n) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(n+1)
        }, 1000)
    })
}

function step1(n) {
    console.log(`step1 with ${n}`)
    return outputNumber(n)
}

function step2(n) {
    console.log(`step2 with ${n}`)
    return outputNumber(n)
}

function step3(n) {
    console.log(`step3 with ${n}`)
    return outputNumber(n)
}

function step4(n) {
    console.log(`step4 with ${n}`)
    return outputNumber(n)
}

function doIt() {
    const time1 = 1;
    step1(time1)
        .then(time2 => step2(time2))
        .then(time3 => step3(time3))
        .then(time4 => step4(time4))
}

doIt()