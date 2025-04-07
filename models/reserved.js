const fs=require('fs')
const rootPath=require('../utils/rootPath')
const path=require('path')
const reservedPath = path.join(rootPath, 'data', 'reserved.json')

module.exports=class Reserve{
    static addReserve(homeId,callBack){
        Reserve.getReserve(reserved=>{
            if(reserved.includes(homeId)){
                callBack("already added")
            }else{
                reserved.push(homeId)
                fs.writeFile(reservedPath,JSON.stringify(reserved),callBack)
            }
        })
    }
    static getReserve(callBack){
        fs.readFile(reservedPath,(err,data)=>{
            callBack(!err?JSON.parse(data):[])
        })
    }
    static cancle(id){
        Reserve.getReserve(homeIds=>{
            // NOTE: isme sirf id hi rahegi to id ko hi hatana hai isiliye hum homeIds hi maan rhe hai
            homeIds=homeIds.filter(homeId=>id!==homeId)
            fs.writeFile(reservedPath,JSON.stringify(homeIds),(error)=>{
                if(error){
                    console.log("error")
                }
            })
        })
    }
}