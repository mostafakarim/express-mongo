const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router();
const Profile = require('../models/Profile');
const STATUS = {
	SUCCESS : 'success',
	FAIL : 'fail',
};
router.get('/profile', (req, res) => {
	const filters = req.query;
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

router.get('/profile/update', (req, res) => {
	const query = req.query;
	Profile.findByIdAndUpdate(query.id, query, {new: true})
	.then(profile => {
		res.json({
			confirmation: STATUS.SUCCESS,
			data: profile,
		});
	})
	.catch(err => {
		res.json({
			confirmation: STATUS.FAIL,
			message: err.message
		})
	});
});

router.get('/profile/remove', (req, res) => {
	const query = req.query;
	Profile.findByIdAndRemove(query.id)
	.then(() => {
		res.json({
			confirmation: STATUS.SUCCESS,
			message: 'Profile ' + query.id + ' successfully removed.'
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
		});
	});
}); 

router.post('/profile', (req, res) => {

	Profile.create(req.body)
	.then(profile => {
		res.json({
			confirmation: STATUS.SUCCESS,
			data: profile
		})
	})
	.catch(err => {
		res.json({
			confirmation: STATUS.FAIL,
			message: err.message
		})
	})
})

module.exports = router
