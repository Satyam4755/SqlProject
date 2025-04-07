
// models ke file ko call karenge
const { render } = require('ejs')
const homes = require('../models/homes')
const favourite = require('../models/favourite')
const Reserved = require('../models/reserved')



exports.homePage = (req, res, next) => {
    let opacity = {}; // Define opacity as an object

    homes.fetch().then(([registerHomes])=>{
        // console.log(registerHomes);
        favourite.getFavourite(favourites => {  // Fetch favourite home IDs
            registerHomes.forEach(home => {
                opacity[home.id] = favourites.includes(home.id) ? 0 : 10; // Assign opacity per home
            });

        });
        res.render('./store/home', { homes: registerHomes, title: "Home Page", opacity: opacity });
    }).catch((error)=>{
        console.log("error", error)
    })
};

// const {registerHomes}=require('../routes/host')--------iski jarurat nhi padegi kyunki registerHomes isi file me declare kiya gaya hai

// home-details
exports.homeDetails = (req, res, next) => {
    let opacity = {};
    const homeId = req.params.homeId;
    homes.findById(homeId).then(([homes])=>{
        const home=homes[0];
        if (!home) {
            res.redirect('/user/home-list');
        } else {
            favourite.getFavourite(favourites => {
                    opacity[homeId] = favourites.includes(homeId) ? 0 : 10; 
            res.render('./store/home-details', { home: home, title: "home details", opacity: opacity  })
            })
        }
    })
        
}

// ************************************VERY IMPORTANT********************************
// favourite list
exports.favouriteList = (req, res, next) => {
    favourite.getFavourite(favourites => {
        homes.fetch().then(([registerHomes])=>{
            const matchedHomes = registerHomes.filter(regHome => {
                return favourites.includes(regHome.id)
            })
            res.render('./store/favourite_list', { homes: matchedHomes, title: "favourite list" })
        })
    })


}
// post favourite list
exports.postfavouriteList = (req, res, next) => {
    const homeId = req.body.homeId;
    favourite.addFavourite(homeId, err => {
        if (err) {
            console.log("error in adding favourite")
        }
        res.redirect('/user/favourite_list')
    })
}
// unfavourite home
exports.postUnfavourite=(req,res,next)=>{
    const homeId=req.params.homeId
    favourite.unfavourite(homeId)
    res.redirect('/user/favourite_list')
}

// reserved
exports.reserved = (req, res, next) => {
    Reserved.getReserve(reserves => {
        homes.fetch().then(([reservedHomes])=>{
            const matchedHomes = reservedHomes.filter(resHome => {
                return reserves.includes(resHome.id)
            })
            res.render('./store/reserve', { homes: matchedHomes, title: "Reserved Home list" })
        })
    })
}
//post reserve
exports.Postreserved=(req,res,next)=>{
    const homeId=req.params.homeId;
    Reserved.cancle(homeId)
    res.redirect('/user/reserve')
}

// booking
exports.booking = (req, res, next) => {
    const homeId = req.params.homeId;
    homes.findById(homeId).then(([homes])=>{
        const home=homes[0];
        if (!home) {
            // console.log("no home")
            res.redirect('/user/home-list');
        } else {
            res.render('./store/booking', { home: home, title: "booking" })
        }
    })

}
// post booking
exports.Postbooking=(req,res,next)=>{
    const homeId=req.params.homeId
    const checkindate=req.body.checkin
    homes.findById(homeId).then(([homes])=>{
        const home=homes[0];
        if(!home){
            console.log("no home")
        }
        else{
            Reserved.addReserve(homeId,error=>{//------------isse sirf id reserve file me add ho rha hai
                if(error){
                    console.log("error in adding reserve")
                }
                // res.render('./store/reserve', {home:home, title: "submit booking
            })
        }
        res.redirect('/user/submit_booking')
    })
    
}

exports.userPage = (req, res, next) => {
    // registerHomes ka variable me, fetch() ko call karenge
    res.render('./store/user', { title: "User Page" })

}
exports.submitBooking=(req,res,next)=>{
    res.render('./store/submitBooking', {title: "submit booking" })
}

// post submit booking
exports.PostsubmitBooking=(req,res,next)=>{
    const homeId=req.params.homeId
    homes.findById(homeId).then(([homes])=>{
        const home=homes[0];
        if(!home){
            return res.redirect('/user/home-list');
        }
        else{
            res.render('./store/reserve', {home:home, title: "submit booking" })
            // res.redirect('/user/reserve')
        }
        console.log("success")
    })
}

// exports.registerHomes=registerHomes;//-------------ab iski jarurat nhi padegi


