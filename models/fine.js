import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const FineSchema = new Schema({
	isPaid: Boolean,
	description: String,
	amount: Number,
	player: {
		type: Schema.Types.ObjectId,
		ref: 'Player'
	},
}, {
	timestamps: true
});

export default mongoose.model('Fine', FineSchema);