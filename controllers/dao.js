'use strict';

const client = require("redis").createClient(process.env.REDIS_URL);
const moment = require("moment-timezone");
const request = require("request");

const API_ROOT_URL = "http://api.football-data.org/v2/";
const REDIS_STORE_KEYS = {
    "SCHEDULED": 1,
    "LIVE": 2,
    "STANDINGS": 3
};
const competitions = {
    "SA": 2019, // Serie A
    "PD": 2014, // La Liga
    "PL": 2021, // Premier League
    "CL": 2001 // Champions League
};

var today = moment().format("YYYY-MM-DD");
var tminus5 = moment().add(-5, "days").format("YYYY-MM-DD");
var tplus5 = moment().add(5, "days").format("YYYY-MM-DD");

function callAPI(url, filters, callBack) {
    var options = {
        method: 'GET',
        url: url,
        qs: filters,
        headers: {
            'X-Auth-Token': process.env.FOOTBALL_DATA_API_TOKEN
        }
    };
    var responseJson;
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            responseJson = JSON.parse(body);
        } else if (error) {
            console.error(error);
        }
        callBack(responseJson);
    });
}

module.exports = {
    writeScheduledMatches: function (competition) {

    },
    readScheduledMatches: function (competition) {

    },
    writeLiveMatches: function (competition) {

    },
    readLiveMatches: function (competition) {

    },
    writeStandings: function (competition) {

    },
    readStandings: function (competition) {

    },
    writeTopScorers: function (competition) {

    },
    readTopScorers: function (competition) {

    },
    writeMatchDay: function () {
        Object.keys(competitions).forEach(function (key) {
            var url = API_ROOT_URL + 'competitions/' + key;
            callAPI(url,null,function(data){
                var redisKey = key + "_matchDay";
                var value = data.currentSeason.currentMatchday;
                client.set(redisKey,value);
            }); 
        });
    }
};