const { Schema, model, Types, mongoose } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
    {
    reactionId: {type: Schema.Types.ObjectId, default: () => new Types.ObjectId()},
    reactionBody: {type: String, required: true, max: 280},
    username: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

//uses moment to format the date. I don't quite have the format right but I don't want to spend any more time on this 
const thoughtSchema = new Schema(
    {
    thoughtText: {type: String, required: true, min: 1, max: 280},
    createdAt: {type: Date, default: Date.now, get: createdTime => moment(createdTime).format('mm dd, yyy hh:mm')},
    username: {type: String, required: true},
    reactions: [reactionSchema],
},
{
    //returns virtuals in JSON format as part of the JSON response 
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false,
}
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})


const thought = mongoose.model('thought', thoughtSchema );

module.exports = thought;