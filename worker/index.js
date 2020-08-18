var CronJob = require('cron').CronJob;

const fetchGitHub = require('./tasks/fetch-github')

new CronJob('* * * * *', fetchGitHub, null, true, 'America/Los_Angeles');
