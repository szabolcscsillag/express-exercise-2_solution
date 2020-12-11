const express = require('express');
const userRouter = express.Router();
const dataService = require('../services/data-service');


function renderPeople(err, data, resp) {
    if (err) {
        console.error(err);
        resp.sendStatus(500);
    } else {
        resp.render('users', { people: data });
    }
}

function toPromise(fn, ...params) {
    return new Promise((res, rej) => {
        fn(...params, (err, data) => {
            if (err) {
                rej(err)
            } else {
                res(data);
            }
        });
    });
}

userRouter.route('/').get((req, resp) => {
    let selectedCountry = req.query.country;
    let selectedAgeGroup = req.query.ageGroup;
    const promises = [
        toPromise(dataService.filterUsers, selectedCountry, selectedAgeGroup),
        toPromise(dataService.getCountries),
        toPromise(dataService.getAgeGroups)
    ];
    Promise.all(promises)
        .then(([users, countries, ageGroups]) => {
            resp.render('users', { users, countries, ageGroups, selectedCountry, selectedAgeGroup })
        })
        .catch(err => {
            resp.status(500);
            console.error(err);
        });

});



userRouter.route('/:id').get((req, resp) => {
    dataService.getById(req.params.id, (err, data) => {
        if (err) {
            console.error(err);
            resp.status(404).send();
        } else {
            if (!data) {
                resp.status(404);
            } else {
                resp.render('user', { user: data })
            }
        }
    })
});

module.exports = userRouter;