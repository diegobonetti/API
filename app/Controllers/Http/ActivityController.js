'use strict'

const Activity = use('App/Models/Activity')

class ActivityController {

    async create({request}){

        const name = request.only('name');

        const activity = await Activity.create(name);

        return activity;
    }


}

module.exports = ActivityController
