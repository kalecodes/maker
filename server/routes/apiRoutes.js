const router = require('express').Router();
const s3 = require('../controllers/s3-controller');

router.route('/sign-s3').get(s3.signedS3);

module.exports = router;