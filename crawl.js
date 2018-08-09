/**
 * Crawling videos from playlist using Youtube Data V3 API
 * command: node crawl <PLAYLIST_ID>
 * 
 * @author wingkwong
 */
'use strict';

/**
 * Require modules 
 */
const axios = require('axios');
const fs = require('fs');

/**
 * Check param PLAYLIST ID; Quit if not exist
 */
const PLAYLIST_ID = process.argv[2];

if (PLAYLIST_ID == undefined) {
  return console.log('ERROR: PLAYLIST_ID is missing. The command is: node crawl <PLAYLIST_ID>');
}

/**
 * Query Parameters for Youtube Data V3 API
 */
const PART = 'YOUR_PART'; //CHANGE IT
const YOUTUBE_API_KEY = 'YOUR_YOUTUBE_API_KEY'; //CHANGE IT
const URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

/**
 * Local Parameters
 */
const DEST_FILE_PATH = 'YOUR_DEST_FILE_PATH'; //CHANGE IT
const DEST_FILE_NAME = PLAYLIST_ID + '.json';
const DEST_LOCATION  = DEST_FILE_PATH + DEST_FILE_NAME;  

/**
 * Request a playlistItems object in JSON format and write to DEST_LOCATION
 */
axios.get(URL, {
  params: {
    part: PART,
    playlistId: PLAYLIST_ID,
    key: YOUTUBE_API_KEY
  }
})
.then(function (response) {
  var data = JSON.stringify(response.data);
  fs.writeFile(DEST_LOCATION, data, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log('Generated ' + DEST_LOCATION + ' successfully');
  }); 
})
.catch(function (error) {
  console.log('ERROR: Failed to retrieve data');
  console.log(error);
})
.then(function () {

});



