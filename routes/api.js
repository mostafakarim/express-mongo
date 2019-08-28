const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router();
const Profile = require('../models/Profile');
const STATUS = {
	SUCCESS : 'success',
	FAIL : 'fail',
}   

/*  This is a sample API route. */

router.get('/profile', (req, res) => {
	const filters = req.query;
	if(filters.age) {
		filters.age = {
			$gte: 10
		}
	}
	Profile.find(filters)
	.then(profiles => {
		res.json({
			confirmation: STATUS.SUCCESS,
			data: profiles
		});
	})
	.catch(err => {
		res.json({
			confirmation: STATUS.FAIL,
			message: err.message
		})
	});
});

router.get('/profile/:id', (req, res) => {
	const {id} = req.params;
	Profile.findById(id)
	.then(profile => {
		res.json({
			confirmation: STATUS.SUCCESS,
			data: profile
		});
	}) 
	.catch(err => {
		res
		.json({
			confirmation: STATUS.FAIL,
			message : 'Profile ' + id + ' no found'
		})
		.status(404);
	});
})

module.exports = router
