import Player from '../models/player';
import Fines from '../models/fine';

const postPlayer = (req, res) => {
	const player = new Player({ ...req.body
	});
	player.save(err => {
		if (err) return res.json({
			success: false,
			error: err
		});
		return res.json({
			success: true,
			data: player
		});
	});
};

const getAllPlayers = (req, res) => {
	Player
		.find()
		.then(players => {
			return res.json({
				success: true,
				data: players
			});
		})
		.catch(err => {
			return res.json({
				success: false,
				error: err
			});
		})
};

const getPlayerWithFinesByPlayerId = (req, res) => {
	const playerId = req.params.id;
	let playerWithFines;
	Player
		.findOne({
			hashId: playerId
		})
		.then((player) => {
			playerWithFines = player;
			return Fines.find({
				player: player.id
			})
		})
		.then((fines) => {
			fines.forEach((fine) => {
				fine.isPaid ? playerWithFines.paidFinesId.push(fine) : playerWithFines.unpaidFinesId.push(fine);
			});


			return res.json({
				success: true,
				data: playerWithFines
			});
		})
}

export {
	getAllPlayers,
	getPlayerWithFinesByPlayerId,
	postPlayer
};