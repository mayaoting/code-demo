console.log(1)
setTimeout(()=>{
    console.log(2)
},0)
process.nextTick(()=>{
    console.log(3)
})
new Promise((resolve)=>{
    console.log(4)
    resolve()
}).then(()=>{
    console.log(5)
})
