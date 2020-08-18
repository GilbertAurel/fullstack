var fetch = require('node-fetch');
const redis = require("redis");
const client = redis.createClient();

// Redis setup
const { promisify } = require("util");
//const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Api source
const baseURL = 'https://jobs.github.com/positions.json';

async function fetchGitHub(){

    console.log('fetching github');
    let onPage = 0;
    const allJobs = [];

    // fetch all pages
    for(;;){
        const res = await fetch(`${baseURL}?page=${onPage}`);
        const jobs = await res.json();

        if(jobs.length == 0){break;}

        allJobs.push(...jobs);
        console.log(jobs.length, 'jobs');
        onPage++;
    }
    console.log('raw total', allJobs.length);

    // filter
    const jrJobs = allJobs.filter(job => {
        const jobTitle = job.title.toLowerCase();

        // algo logic
        if (
            jobTitle.includes('senior') ||
            jobTitle.includes('manager') ||
            jobTitle.includes('sr.') ||
            jobTitle.includes('architect')    
        ) {
            return false;
        }

        return true;
    });

    console.log('filtered down to', jrJobs.length);

    // Set value redis
    const success = await setAsync('gitHub', JSON.stringify(jrJobs)); //SET REDIS
    console.log({success});
}

//fetchGitHub();
module.exports = fetchGitHub;