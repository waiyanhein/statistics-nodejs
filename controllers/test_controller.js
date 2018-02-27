var ffmpeg = require('ffmpeg');
var fs = require('fs');

module.exports.createVideoThumbnail = function(req, res)
{
    try {
		var process = new ffmpeg('public/lalaland.mp4');
		process.then(function (video) {
            
            video.fnExtractFrameToJPG('public', {
				frame_rate : 1,
				number : 5,
				file_name : 'my_frame_%t_%s'
			}, function (error, files) {
				if (!error)
                    console.log('Frames: ' + files);
                else
                    console.log(error)
			});

		}, function (err) {
			console.log('Error: ' + err);
		});
	} catch (e) {
		console.log(e.code);
		console.log(e.msg);
	}
    res.json({ status : true , message: "Video thumbnail created. Hopefully" });
}

module.exports.testPost = function(req, res)
{
	res.json({ message : req.body.name, header : req.headers['token'] });
}



module.exports.convertFile = function(req, res)
{
	var cloudconvert = new (require('cloudconvert'))('JyaTDDdIESLl-fwQNLG-T0ar4io5bVkDocjZTPKMT6A6UKXLAayVWyZCexqkQTS4UdRbQpcOA-sSiEAUnXyTTQ');
	fs.createReadStream('public/my-heic.HEIC')
	.pipe(cloudconvert.convert({
    	inputformat: 'png',
    	outputformat: 'jpg',
    	converteroptions: {
     	   quality : 75,
    	}
 	})	)
	.pipe(fs.createWriteStream('testing-heic.jpg'))
	.on('finish', function() {
    	console.log('Done!');
    	res.json({ message: 'Done' });
	});
	//res.json({ message : 'work' });

}

module.exports.createFile = function(req, res)
{
	fs.writeFile('message.txt', 'Just now, we have created this file', function (err) {

        if (err) throw err;

        console.log('It\'s saved! in same location.');

    });
}