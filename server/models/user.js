import mongoose from 'mongoose';


const userSchema = mongoose.Schema({
	name: {type: String, required: true},
	email: { type:String, required: true},
	password: {type: String, required: true},
	id: {type:String},
	friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    friendRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]
});

export default mongoose.model("User", userSchema);