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

    findPlaylists(req, res) {
		var email = req.session.email;
		var playlist = new Playlist("", email, []);
		playlist.findAllPlaylists(function(error, playlists) {
			if(error) {
				return res.json({error : error});
			}
			return res.json(playlists);
		});
	}

	findPlaylistByName(nameP, req, res) {
        var email = req.session.email;
		var playlist = new Playlist(nameP, email, []);
		playlist.findPlaylist(function(error, playlist) {
			if(error) {
				return res.json({error : error});
			}
			return res.json(playlist);
		});
	}
}

module.exports = PlaylistController;