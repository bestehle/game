const saveState = require('./saveState');

module.exports = (req, res) => {
	let gameId = req.params.gameId;

	req.db
		.one('SELECT state FROM games WHERE game_id = $<id>', { id: gameId })
		.then(async (data) => {
			// console.log(data);
			let state = data.state;

			let plan1 = req.query.plan1;
			if (plan1 !== undefined) {
				if ((plan1 + '').toLowerCase() === 'true' || plan1 === '1') {
					state.plansApproved[0] = true;
				} else if ((plan1 + '').toLowerCase() === 'false' || plan1 === '0') {
					state.plansApproved[0] = false;
				}
			}

			let plan2 = req.query.plan2;
			if (plan2 !== undefined) {
				if ((plan2 + '').toLowerCase() === 'true' || plan2 === '1') {
					state.plansApproved[1] = true;
				} else if ((plan2 + '').toLowerCase() === 'false' || plan2 === '0') {
					state.plansApproved[1] = false;
				}
			}

			let plan3 = req.query.plan3;
			if (plan3 !== undefined) {
				if ((plan3 + '').toLowerCase() === 'true' || plan3 === '1') {
					state.plansApproved[2] = true;
				} else if ((plan3 + '').toLowerCase() === 'false' || plan3 === '0') {
					state.plansApproved[2] = false;
				}
			}

			state.currentSet.plansApproved = state.plansApproved;

			let saved = await saveState(req.db, gameId, state);
			console.log('Updated plans saved:', saved);

			res.json(state.plansApproved);
		})
		.catch((error) => {
			console.log(error.message || error);
			res.json('error for ' + gameId);
		});
};
