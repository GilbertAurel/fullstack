var fetch = require('node-fetch');
const redis = require("redis");
const client = redis.createClient();

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.get).bind(client);

const baseURL = 'https://jobs.github.com/positions.json';

async function fetchGitHub(){
    let onPage = 0;
    const allJobs = [];

    for(;;){
        const res = await fetch(`${baseURL}?page=${onPage}`);
        const jobs = await res.json();

        if(jobs.length == 0){break;}

        allJobs.push(...jobs);
        console.log(jobs.length);
        onPage++;
    }

    console.log('got', allJobs.length);
}

fetchGitHub();

module.exports = fetchGitHub;