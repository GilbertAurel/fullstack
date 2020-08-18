const express = require('express')
const app = express()
const port = 3001

//REDIS setup and getter
const redis = require("redis");
const client = redis.createClient();
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

// main express api task
app.get('/jobs', async(req, res) => {
    const jobs = await getAsync('gitHub');
    //console.log(JSON.parse(jobs).length);

    // cross express enable
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    return res.send(jobs);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})