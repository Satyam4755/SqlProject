const db = require('../utils/dataBase');

module.exports = class Favourite {
    // constructor(homeId) {
    //     this.homeId = homeId;
    // }

    static addFavourite(homeId) {
        return db.execute("SELECT homeId FROM favouriteHomes WHERE homeId = ?", [homeId])
            .then(([rows]) => {
                if (rows.length > 0) {
                    return Promise.reject("already added");
                } else {
                    return db.execute("INSERT INTO favouriteHomes(homeId) VALUES (?)", [homeId]);
                }
            });
    }

    static getFavourite() {
        return db.execute("SELECT * FROM favouriteHomes");
    }

    static unfavourite(id) {
        return db.execute("DELETE FROM favouriteHomes WHERE homeId = ?", [id]);
    }
}
