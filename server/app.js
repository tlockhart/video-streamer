const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const videos = [
    {
        id: 0,
        poster: '/video/0/poster',
        duration: '3 mins',
        name: 'Sample 1'
    },
    {
        id: 1,
        poster: '/video/1/poster',
        duration: '4 mins',
        name: 'Sample 2'
    },
    {
        id: 2,
        poster: '/video/2/poster',
        duration: '2 mins',
        name: 'Sample 3'
    },
];

const app = express();

// server the sample.mp4 video when requested
app.get("/video", (req, res) => {
    res.sendFile("assets/0.mp4", { root: __dirname})
})

// Allow cross origin request
app.use(cors({
    origin: ['http://localhost:3000']
}));

app.get('/videos', (req, res) => {
    console.log("Videos:", videos)
    res.status(200).json(videos);
});


app.get('/video/:id/data', (req, res) => {
    const id = parsInt(req.params.id, 10);
    console.log("ID:", id);
    res.status(200).json(id);
})


app.listen(4000, () => {
    console.log("Listening on port 4000")
})