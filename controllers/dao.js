'use strict';

const client = require('redis').createClient(process.env.REDIS_URL);
const REDIS_STORE_KEYS = {
    "SCHEDULED" : 1,
    "LIVE" : 2,
    "STANDINGS": 3
};
const moment = require('moment-timezone');
const competitions = '2019,2014,2021,2001,2015';
var today = moment().format("YYYY-MM-DD");
var tminus5 = moment().add(-5, "days").format("YYYY-MM-DD");
var tplus5 = moment().add(5, "days").format("YYYY-MM-DD");

module.exports = {
    writeScheduledMatches : function(){


    },
    readScheduledMatches : function(){

    },
    writeLiveMatches : function(){

    },
    readLiveMatches : function(){

    },
    writeStandings : function(){

    },
    readStandings : function(){
    }
};