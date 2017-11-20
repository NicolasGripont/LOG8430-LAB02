var Playlist = require('../models/playlist');

class PlaylistController {
	constructor() {}
	
	createPlaylist(req,res) {
		var name = req.body.name || "";
		if(name === "") {
			return res.json({error:{message:"The parameter name is invalid"}});
		}
		var list = new Playlist(name,req.session.email,[]);
		list.save(function(err) {
			if(err) {
				return res.json({error:err});
			}
			return res.json({ok:"ok"});
		});
	}
	
	deletePlaylist(req,res) {
		var name = req.body.name || "";
		if(name === "") {
			return res.json({error:{message:"The parameter name is invalid"}});
		}
		var list = new Playlist(name,req.session.email,[]);
		list.remove(function(err) {
			if(err) {
				return res.json({error:err});
			}
			return res.json({ok:"ok"});
		});
	}

	getPlaylists(req, res) {
		var email = req.session.email;
		var playlist = new Playlist("", email, []);
		playlist.getAllPlaylists(function(error, playlists) {
			if(error) {
				return res.json({error : error});
			}
			return res.json(playlists);
		});
	}
}

module.exports = PlaylistController;