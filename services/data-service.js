const {users, ageGroups } = require('./user-data.service');

function getById(id, cb) {
    const user = users.find(u => u.id.value === id);
    if (user) {
        cb(null, user);
    } else {
        cb('Not found', null);
    }
}

function getAgeGroups(cb) {
  cb(null, ageGroups);
}

function getCountries(cb) {
    const countries = users.reduce((cnt, usr) => {
        if (cnt.indexOf(usr.location.country) === -1) {
            cnt.push(usr.location.country);
        }
        return cnt;
    }, []).sort();
    cb(null, countries);
}

function filterUsers(country, ageGroupName, cb) {
    let ageGroup = null;
    if (ageGroupName) {
        ageGroup = ageGroups.find(g => g.name === ageGroupName)
    }
    const filteredUsers = users.filter(u => 
        (country ? u.location.country === country: true) &&
        (ageGroup ? (u.dob.age >= ageGroup.min && u.dob.age  <= ageGroup.max) : 1));
    if (filteredUsers) {
        cb(null, filteredUsers);
    } else {
        cb('Error filtering users', null);
    }
}



module.exports = {
    filterUsers,
    getById,
    getCountries,
    getAgeGroups
};