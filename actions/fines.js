import Player from '../models/player';
import Fine from '../models/fine';

const _getFinesByPlayerId = (isPaid, req, res) => {
	const playerId = req.params.id;
	const obj = {
		player: playerId
	};
	if (typeof(isPaid) === "boolean") {
		obj.isPaid = isPaid
	}
	Fine
		.find(obj)
		.then(fines => {
			return res.json({
				success: true,
				data: fines
			});
		})
		.catch(err => res.json({
			success: false,
			error: err
		}));
};
const postFine = (req, res) => {
	const fine = new Fine({
		...req.body
	});

	fine.save()
		.then(() => {
			return res.json({
				success: true,
				data: fine
			});
		}).catch(err => res.json({
			success: false,
			error: err
		}));
};

const payFinesById = (req, res) => {
	if (!req.body.id) {
		return res.json({
			success: false,
			error: "Missing ID"
		});
	}

	const ids = Array.isArray(req.body.id) ? req.body.id : [req.body.id];
	const promises = ids.map((id) => {
		return new Promise((resolve, reject) => {
			Fine.findByIdAndUpdate(id, {
				isPaid: true
			}, {
				new: true
			}, (err, fine) => {
				if (err) {
					return reject(err);
				}
				Fine.populate(fine, {
					path: "player",
					select: "hashId"
				}).then((check) => {
					resolve(check)
				});
			});
		});
	});
	Promise.all(promises).then((updatedFines) => {
		return res.json({
			success: true,
			data: updatedFines
		});
	});
};

const getUnpaidByPlayerId = _getFinesByPlayerId.bind(this, false);
const getPaidByPlayerId = _getFinesByPlayerId.bind(this, true);
const getAllByPlayerId = _getFinesByPlayerId.bind(this, undefined);

export {
	postFine,
	getUnpaidByPlayerId,
	getPaidByPlayerId,
	getAllByPlayerId,
	payFinesById
};