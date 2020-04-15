'use strict'

const Class = use('App/Models/Class')
const Instructor = use('App/Models/Instructor')
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

    
    async readAll({request}){
        const timestampUtils = new TimestampUtils();
        let classes = await Class
            .query()
            .fetch();

        let classesJSON = classes.toJSON();

        for (var x = 0; x < classesJSON.length; x++){
            let classe = classesJSON[x];
            classesJSON[x]['start_time'] = await timestampUtils.timestampToTime(classe['start_time']);
            classesJSON[x]['end_time'] = await timestampUtils.timestampToTime(classe['end_time']);
        }

        return classesJSON;
    }

    async readOne({params}){
        const timestampUtils = new TimestampUtils();
        let classe = await Class
            .query()
            .leftJoin('instructors', 'classes.instructor_id', 'instructors.id')
            .from('classes').where('classes.id', params.id)
            .fetch();

        let classeJSON = classe.toJSON()[0];

  
        classeJSON['start_time'] = await timestampUtils.timestampToTime(classeJSON['start_time']);
        classeJSON['end_time'] = await timestampUtils.timestampToTime(classeJSON['end_time']);
        
        return classeJSON;
    }

    async remove ({params}){
        const classe = await Class
            .find(params.id);

        await classe.delete();
    }

    async update ({request}){

        let times = request.only(['end_time', 'start_time']);
        let otherData = request.only(['days_of_week', 'room', 'instructor_id', 'id']);

        const classe = await Class
            .find(otherData.id);

        const timestampUtils = new TimestampUtils();

        for (var key in times) {
            times[key] = await timestampUtils.timeToTimestamp(times[key]);
        }

        classe.days_of_week = otherData.days_of_week;
        classe.room = otherData.room;
        classe.instructor_id = otherData.instructor_id;
        classe.end_time = times.end_time;
        classe.start_time = times.start_time;

        await classe.save();

        return classe;
    }
    

}

module.exports = ClassController
