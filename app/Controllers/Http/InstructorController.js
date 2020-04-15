'use strict'

const UserUtils = use('App/Utils/UserUtils')

const User = use('App/Models/User')

const Instructor = use('App/Models/Instructor')

const Database = use('Database')

class InstructorController {

    async create({request}){

        const trx = await Database.beginTransaction();

        const userUtils = new UserUtils();
        let user = await userUtils.register(request, trx);

        let instructor = await Instructor.create({user_id: user.id}, trx);

        const activityData = request.only(['activity_id']);

        trx.commit();
        await instructor.activity().attach([activityData.activity_id])
        

        return instructor;
    }

    async addActivity({request}){
        const data = request.only(['instructor_id', 'activity_id']);
        let instructor = await Instructor.find(data.instructor_id);
        
        await instructor.activity().attach([data.activity_id])

  /*      const union = await Instructor.query().where('id', instructor.id)
        .with('activity', builder => {
            builder.select(['name'])
        }).first();

        return union;  */
    }

    async readOne({params}){
        return await Instructor
            .query()
            .with('user')
            .with('activity')
            .where('instructors.id', params.id)
            .fetch()
    }

    async readAll({request}){
        return await Instructor
            .query()
            .with('user')
            .with('activity')
            .fetch()
    }

    async remove({params}){

        let instructor = await Instructor
            .find(params.id);

        let user = await User
            .find(instructor.user_id);

        await user.delete();
        await instructor.delete();

    }

    
}

module.exports = InstructorController
