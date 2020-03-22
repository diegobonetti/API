'use strict'

const Class = use('App/Models/Class')
const TimestampUtils = use('App/Utils/TimestampUtils')

class ClassController {

    async create({request}){
        let times = request.only(['end_time', 'start_time']);
        let otherData = request.only(['days_of_week', 'room', 'instructor_id']);

        const timestampUtils = new TimestampUtils();

        for (var key in times) {
            times[key] = await timestampUtils.timeToTimestamp(times[key]);
        }

        const newClass = Class.create({...times, ...otherData});

        return newClass;

    }

}

module.exports = ClassController
