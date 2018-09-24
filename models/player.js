import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
	birthday: Date,
	phone: String,
	email: String,
	address: {
		street: String,
		city: String,
		postalCode: String,
	},
	facrId: String,
	hashId: String,
	firstName: String,
	lastname: String,
	imageUrl: String,
	jerseyNumber: Number,
	unpaidFinesId: [],
	paidFinesId: [],
}, {
	timestamps: true
});

export default mongoose.model('Player', PlayerSchema);