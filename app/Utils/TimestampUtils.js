module.exports = class TimestampUtils{
    
    async timeToTimestamp(time){
        time = time.split(':');
        const hours = parseInt(time[0]);
        const minutes = parseInt(time[1]);
        time = hours * 60 + minutes;
        return time;
    }

    async timestampToTime(timestamp){
        const hours = Math.floor(timestamp / 60);
        let minutes = timestamp % 60;
        if (minutes == 0){
            minutes = '00';
        }
        return hours + ":" + minutes;
    }
}
