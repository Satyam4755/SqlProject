
const fs=require('fs')
const rootPath=require('../utils/rootPath')
const path=require('path') 
const FavfilePath=path.join(rootPath,'data','favourite.json')

module.exports=class Favourite{
    static addFavourite(homeId,callBack){
        Favourite.getFavourite(favourites=>{
            if(favourites.includes(homeId)){
                callBack("already added")
            }else{
                favourites.push(homeId)
                fs.writeFile(FavfilePath,JSON.stringify(favourites),callBack)
            }
        })
    }
    static getFavourite(callBack){
        fs.readFile(FavfilePath,(err,data)=>{
            callBack(!err?JSON.parse(data):[])
        })
    }
    // to unfavourite the home
    static unfavourite(id){
        Favourite.getFavourite(homeIds=>{
            // NOTE: isme sirf id hi rahegi to id ko hi hatana hai isiliye hum homeIds hi maan rhe hai
            homeIds=homeIds.filter(homeId=>id!==homeId)
            fs.writeFile(FavfilePath,JSON.stringify(homeIds),(error)=>{
                if(error){
                    console.log("error")
                }
            })
        })
    }
}

