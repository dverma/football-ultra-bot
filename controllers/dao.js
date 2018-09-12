'use strict';

const REDIS = require("redis");
const client = REDIS.createClient(process.env.REDIS_URL);
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

//var today = moment().format("YYYY-MM-DD");
var tminus5 = moment().add(-5, "days").format("YYYY-MM-DD");
var tplus5 = moment().add(5, "days").format("YYYY-MM-DD");

function callAPI(url, filters, callBack) {
    console.log("Inside callAPI");
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
        var url = API_ROOT_URL + 'competitions/' + competition + "/matches";
        var filter = {};
        var matchDay = this.readMatchDay(competition);
        if (!matchDay) {
            filter.dateFrom = tminus5;
            filter.dateTo = tplus5;
        } else {
            filter.matchDay = matchDay;
        }
        callAPI(url, filter, function (data) {
            var redisKey = competition + "_scheduled";
            var result = [];
            var value;
            if (!data) {
                value = "No data available.";
            } else if (data.count > 0) {
                var matches = data.matches;
                matches.forEach(element => {
                    var match = element.homeTeam.name + " vs " + element.awayTeam.name;
                    if (element.score.fullTime.homeTeam !== null) {
                        match += "\n " + element.score.fullTime.homeTeam + " - " + element.score.fullTime.awayTeam;
                    } else {
                        match += "\n" + moment(element.utcDate).tz('America/Chicago').format("lll") + " CST" +
                            "\n" + moment(element.utcDate).tz('Asia/Kolkata').format("lll") + " IST";
                    }
                    result.push(match);
                });
                value = result.join('\n');
            }
            console.log(redisKey + " " + value);
            client.set(redisKey, value, 'EX', 60000);
        });
    },
    readScheduledMatches: function (competition) {
        var redisKey = competition + '_scheduled';
        var matches = client.get(redisKey);
        if (!matches) {
            this.writeScheduledMatches(competition);
            matches = client.get(redisKey);
        }
        return matches;
    },
    writeLiveMatches: function (competition) {
        var url = API_ROOT_URL + 'competitions/' + competition + "/matches";
        var filter = {
            status: 'LIVE'
        };
        callAPI(url, filter, function (data) {
            var redisKey = competition + "_live";
            var result = [];
            if (data.count > 0) {
                var matches = data.matches;
                matches.forEach(element => {
                    var match = element.homeTeam.name + " vs " + element.awayTeam.name +
                        "\n " + element.score.fullTime.homeTeam + " - " + element.score.fullTime.awayTeam;
                    result.push(match);
                });
            }
            var value = result.join('\n');
            console.log(redisKey + " " + value);
            client.set(redisKey, value, 'EX', 30000);
        });

    },
    readLiveMatches: function (competition) {
        var redisKey = competition + '_live';
        var matches = client.get(redisKey);
        if (!matches) {
            this.writeLiveMatches(competition);
            matches = client.get(redisKey);
        }
        return matches;
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
            callAPI(url, null, function (data) {
                var redisKey = key + "_matchDay";
                var value = data.currentSeason.currentMatchday;
                console.log(redisKey + " " + value);
                client.set(redisKey, value, 'EX', 80000);
            });
        });
    },
    readMatchDay: function (competition) {
        var redisKey = competition + '_matchDay';
        var matchDay = client.get(redisKey);
        if (!matchDay) {
            this.writeMatchDay();
            matchDay = client.get(redisKey);
        }
        return matchDay;
    }
};