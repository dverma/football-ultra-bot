'use strict';

const REDIS = require("redis");
const client = REDIS.createClient(process.env.REDIS_URL);
const moment = require("moment-timezone");
const request = require("request");

const API_ROOT_URL = "http://api.football-data.org/v2/";
const competitions = {
    "SA": 2019, // Serie A
    "PD": 2014, // La Liga
    "PL": 2021, // Premier League
    "CL": 2001 // Champions League
};

var tminus10 = moment().add(-10, "days").format("YYYY-MM-DD");
var tplus10 = moment().add(10, "days").format("YYYY-MM-DD");

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
    console.log(options);
    request(options, function (error, response, body) {
        var responseJson;
        if (!error && response.statusCode == 200) {
            responseJson = JSON.parse(body);
        } else if (error) {
            console.log(error);
        }
        callBack(responseJson);
    });
}

function writeScheduledMatches(competition, cb) {
    var url = API_ROOT_URL + 'competitions/' + competition + "/matches";
    var filter = {};
    readMatchDay(competition, function (matchDay) {
        //console.log(competition + " " + matchDay);
        if (!matchDay) {
            filter.dateFrom = tminus10;
            filter.dateTo = tplus10;
        } else {
            filter.matchday = parseInt(matchDay);
        }
        //console.log(filter);
        callAPI(url, filter, function (data) {
            var redisKey = competition + "_scheduled";
            var result = [];
            var value;
            if (!data) {
                value = "No data available. Please try again.";
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
                value = result.join('\n\n');
            }
            cb(value);
            //console.log(redisKey + " " + value);
            client.set(redisKey, value, 'EX', 47);
        });
    });
}

function writeLiveMatches(competition, cb) {
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
        var value = result.join('\n\n');
        if (value === '' || !value)
            value = "No live matches going on."
        cb(value);
        //console.log(redisKey + " " + value);
        client.set(redisKey, value, 'EX', 17);
    });
}
function writeStandings(competition, cb){
    var url = API_ROOT_URL + 'competitions/' + competition + "/standings";
    callAPI(url, null, function (data) {
        var redisKey = competition + "_live";
        var result = [];
        var standings = data.standings;
        standings.forEach(standing => {
            if(standing.type==='TOTAL'){
                var grp = '\n'+standing.group;
                var rows = standing.table;
                if(competition==='CL'){
                    result.push(grp);
                }
                rows.forEach(element => {
                    var row = element.position+". "+element.team.name
                        +"\nP "+element.playedGames+" "
                        +"W "+element.won+" "
                        +"D "+element.draw+" "
                        +"L "+element.lost+" "
                        +"Pts "+element.points+" "
                        +"GF "+element.goalsFor+" "
                        +"GA "+element.goalsAgainst;
                    result.push(row);
                });
            }
        });
        var value = result.join('\n\n');
        cb(value);
        client.set(redisKey,value,'EX', 60);
    });
}

function writeTopScorers(competition,cb){
    var url = API_ROOT_URL + 'competitions/' + competition + "/scorers";
    callAPI(url, null, function (data) {
        var redisKey = competition + "_scorers";
        var result = [];
        var scorers = data.scorers;
        scorers.forEach(scorer => {
            var s = scorer.player.name+ " "+scorer.team.name+ " "+ scorer.numberOfGoals;
            result.push(s);
        });
        var value = result.join('\n');
        cb(value);
        client.set(redisKey,value,'EX', 900);
    });
    
}

function writeMatchDay() {
    Object.keys(competitions).forEach(function (key) {
        var url = API_ROOT_URL + 'competitions/' + key;
        callAPI(url, null, function (data) {
            var redisKey = key + "_matchDay";
            var value = data.currentSeason.currentMatchday;
            console.log(redisKey + " " + value);
            client.set(redisKey, value, 'EX', 86000);
        });
    });
}

function readMatchDay(competition, cb) {
    var redisKey = competition + '_matchDay';
    client.get(redisKey, function (err, reply) {
        if (!reply) {
            console.log(err);
            writeMatchDay();
            cb(null);
        } else {
            cb(reply);
        }
    });
}

module.exports = {
    readScheduledMatches: function (competition, cb) {
        var redisKey = competition + '_scheduled';
        client.get(redisKey, function (err, reply) {
            if (!reply || reply == null || reply === 'null') {
                writeScheduledMatches(competition, function (data) {
                    cb(data);
                });
            } else {
                cb(reply.toString());
            }
        });
    },
    readLiveMatches: function (competition, cb) {
        var redisKey = competition + '_live';
        client.get(redisKey, function (err, reply) {
            if (!reply || reply == null || reply === 'null') {
                writeLiveMatches(competition, function (data) {
                    cb(data);
                });
            } else {
                cb(reply.toString());
            }
        });
    },
    readStandings: function (competition, cb) {
        var redisKey = competition+'_standings';
        client.get(redisKey, function (err, reply) {
            if (!reply || reply == null || reply === 'null') {
                writeStandings(competition, function (data) {
                    cb(data);
                });
            } else {
                cb(reply.toString());
            }
        });
    },
    readTopScorers: function (competition) {
        var redisKey = competition+'_scorers';
        client.get(redisKey, function (err, reply) {
            if (!reply || reply == null || reply === 'null') {
                writeTopScorers(competition, function (data) {
                    cb(data);
                });
            } else {
                cb(reply.toString());
            }
        });
    }
};