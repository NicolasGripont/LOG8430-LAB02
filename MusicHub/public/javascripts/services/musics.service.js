var musicHub = musicHub || {};

/**
 * Defines a service to retrieve the tracks.
 *
 * @author Nicolas Gripont <nicolas.gripont@polymtl.ca>treille@polymtl.ca>
 */
musicHub.musicsService = (function($) {
    "use strict";

    var self = {};

    /**
     * Gets all products associated with the category and order by the sortingCriteria
     *
     * @param query     The search query, keyword
     * @param callback            Function called when result is gotten. Called with the json object of
     *                            {API_name : [Tracks],...} if success or an empty json objct if fail as parameter.
     */
    self.searchTracks = function (query, callback) {
        $.ajax({
            url: "/connector/search/" + query,
            type: "GET"
        }).done(function (tracks) {
            sessionStorage.setItem("tracks", JSON.stringify(tracks));
            return callback(tracks);
        }).fail(function (error) {
            return callback({})
        })
        return false;
    }

    /**
     * Finds the track associated with the track ID and api specified from 'tracks' stored in sessionStorage.
     *
     * @param api         The api associated with the track to retrieve.
     * @param trackId     The track ID associated with the track to retrieve.
     * @param callback    Function called when result is gotten. Called with the json of track if success or
     *                    null value if fail as parameter.
     */
    self.findTrackFromSearchResultInSessionStrorage = function(api, trackId, callback) {
        var tracks = JSON.parse(sessionStorage.getItem("tracks"));
        if(tracks) {
            var apiTracks = tracks[api];
            if(apiTracks) {
                for(var i = 0; i < apiTracks.length; i++) {
                    if(apiTracks[i].id == trackId) {
                        return callback(apiTracks[i]);
                    }
                }
            }
        }
        return callback(null);
    };

    /**
     * Finds the track associated with the track ID and api specified from 'playlist' stored in sessionStorage.
     *
     * @param api         The api associated with the track to retrieve.
     * @param trackId     The track ID associated with the track to retrieve.
     * @param callback    Function called when result is gotten. Called with the json of track if success or
     *                    null value if fail as parameter.
     */
    self.findTrackFromPlaylistInSessionStrorage = function(api, trackId, callback) {
        var playlist = JSON.parse(sessionStorage.getItem("playlist"));
        if(playlist) {
            var musics = playlist.musics;
            for(var i = 0; i < musics.length; i++) {
                if(musics[i].id == trackId && musics[i].platform === api) {
                    return callback(musics[i]);
                }
            }
        }
        return callback(null);
    };


    /**
     * Retrieves the playlists associated with the current connected user.
     *
     * @param callback    Function called when result is gotten. Called with the json array of playlists if success or
     *                    an empty json array if fail as parameter.
     */
    self.retrievePlaylists = function(callback) {
        $.ajax({
            url: "/playlist/",
            type: "get",
            dataType: "json"
        }).done(function(playlists) {
            return callback(playlists);
        }).fail(function (error) {
            return callback([]);
        })
    }

    /**
     * Retrieves the playlist associated with the playlist name specified and current connected user.
     *
     * @param playlistName  The playlist name of the playlist to retrieve.
     * @param callback      Function called when result is gotten. Called with the json of the playlist if success or
     *                      null value if fail as parameter.
     */
    self.retrievePlaylist = function(playlistName, callback) {
        $.ajax({
            url: "/playlist/" + playlistName,
            type: "get",
            dataType: "json"
        }).done(function(playlist) {
            sessionStorage.setItem("playlist",JSON.stringify(playlist));
            return callback(playlist);
        }).fail(function(error) {
            return callback(null);
        })
    }

    /**
     * Create a playlist associated with the playlist name specified and current connected user.
     *
     * @param playlistName  The playlist name of the playlist to create.
     * @param callback      Function called when playlist is created or if failed.
     *                      Called with the error json with "message" attribute if fail or null if success as parameter.
     */
    self.createPlaylist = function(playlistName, callback) {
        $.ajax({
            url: "/playlist/create",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                name: playlistName
            })
        })
        .done(function (success) {
            return callback(null);
        })
        .fail(function (error) {
            if(error.responseJSON.message) {
                return callback(error.responseJSON);
            }
            return callback({message: "Server Error."});
        });
    };

    /**
     * Add a music to the playlist associated to the name.
     *
     * @param playlistName  The playlist name of the playlist where the music will be added
     * @param music         The music to add, the format is {id:someId, platform:somePlatform}
     * @param callback      Function called when playlist is added or if failed.
     *                      Called with the error json with "message" attribute if fail or null if success as parameter.
     */
    self.addMusicToPlaylist = function(playlistName, music, callback) {
        $.ajax({
            url: "/playlist/music",
            type: "PUT",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                name: playlistName,
                id: music.id,
                platform: music.platform
            })
        })
        .done(function(music) {
            callback(music.error);
        })
        .fail(function (xhr, status, errorThrown) {
            callback({message:"Connection Error."});
        });

    };


    self.deleteMusicFromPlaylist = function(playlistApi, playlistName, musicId, callback) {
        $.ajax({
            url: "/playlist/music",
            type: "Delete",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                //TODO refactoring json api names
                name: playlistName,
                id: musicId,
                platform: playlistApi
            })
        })
        .done(function(success) {
            callback(null);
        })
        .fail(function (error) {
            if(error.responseJSON.message) {
                return callback(error.responseJSON);
            }
            return callback({message: "Server Error."});
        });

    };

    return self;
})(jQuery);
