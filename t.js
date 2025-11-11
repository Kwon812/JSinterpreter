

const a=[]
const b=[]



setInterval(()=>{

    if(b.length!==0){
        console.log(b)
        b.pop()
    }
    if(a.length!==0){
        console.log(a)
        a.pop()
    }
},0)






function t(){
    a.push('a2')
}
a.push('a1')
b.push("b1")

t()