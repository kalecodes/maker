const aws = require('aws-sdk');

const AWS_REGION = process.env.AWS_REGION;
const S3_BUCKET = process.env.S3_BUCKET;

const folder = 'maker-images'; // hard coded here, but can be dynamic

aws.config.region = AWS_REGION;

module.exports = {
    signedS3: function (req, res) {
        const s3 = new aws.S3();
        const fileName = `${folder}/${req.query['file-name']}`;
        const fileType = req.query['file-type'];
        const s3Params = {
            Bucket: 'my-maker-bucket',
            Key: fileName,
            Expires: 60,
            ContentType: fileType,
            ACL: 'public-read'
        };

        s3.getSignedUrl('putObject', s3Params, (err, data) => {
            if (err) {
                console.log(err);
                return res.end();
            }
            const returnData = {
                signedRequest: data,
                url: `https://my-maker-bucket.s3.amazonaws.com/${fileName}`
            };
            res.json(returnData);
            return res.end();
        });
    },
    savedDetails: function (req, res) {
        console.log(req.body);
    }
};