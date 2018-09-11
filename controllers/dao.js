'use strict';

const client = require("redis").createClient(process.env.REDIS_URL);
const moment = require("moment-timezone");
const request = require("request");

const API_ROOT_URL = "http://api.football-data.org/v2/";
const REDIS_STORE_KEYS = {
    "SCHEDULED" : 1,
    "LIVE" : 2,
    "STANDINGS": 3
};
const competitions = {
    "SA" : 2019, // Serie A
    "PD" : 2014, // La Liga
    "PL" : 2021, // Premier League
    "CL" : 2001  // Champions League
};

var today = moment().format("YYYY-MM-DD");
var tminus5 = moment().add(-5, "days").format("YYYY-MM-DD");
var tplus5 = moment().add(5, "days").format("YYYY-MM-DD");

function callAPI(url,filters){

}

module.exports = {
    writeScheduledMatches : function(competition){

    },
    readScheduledMatches : function(competition){

    },
    writeLiveMatches : function(competition){

    },
    readLiveMatches : function(competition){

    },
    writeStandings : function(competition){

    },
    readStandings : function(competition){

    },
    writeTopScorers : function(competition){

    },
    readTopScorers : function(competition){

    }
};