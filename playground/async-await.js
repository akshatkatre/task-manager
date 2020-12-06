console.log('start...')

const myFunc = ()=> {
    setTimeout(()=>{
        console.log("inside arrow function")
    }, 2000)
}
myFunc()

const myFunc1 = ()=> {
    setTimeout(()=>{
        console.log("inside arrow function 1")
    }, 1000)
}
myFunc1()

console.log('end...')