
//--------------for accessing the data from the db
const db=require('../utils/dataBase')

module.exports=class homes{
    // constructor banyenge jisse pehle check ho sake ki values gyi hai ya nhi \
    // agar values nhi jayengi to error show ho jayega
    constructor(name,type,location,price,imageURL,rating){
        // this.id=id;
        this.name=name;
        this.type=type;
        this.location=location;
        this.price=price;
        this.imageURL=imageURL;
        this.rating=rating;
    }

    // phir ab save() banayenge jisme data save ho rha hoga array me jo controller me ho rha tha kyunki wo controller ka kaam nhi hai data ko retrieve krna. ye kaam models ka hai
    
    save() {
        if(this.id){//agar id hai to update hoga 
            return db.execute("UPDATE homes SET name=?,type=?,location=?,price=?,imageURL=?,rating=? WHERE id=?",[this.name,this.type,this.location,this.price,this.imageURL,this.rating,this.id]
            );
        }else{//nhi to sirf insert hoga
            return db.execute("INSERT INTO homes(name,type,location,price,imageURL,rating) VALUES (?,?,?,?,?,?)",[this.name,this.type,this.location,this.price,this.imageURL,this.rating]
            );
        }
    }
    static fetch(){
        return db.execute("SELECT * FROM homes");
    }
    static findById(id){
        return db.execute("SELECT * FROM homes WHERE id=?",[id]);
    }


// to delete the home
    static deleteHome(id){
        return db.execute("DELETE FROM homes WHERE id=?",[id]);
    }




}


