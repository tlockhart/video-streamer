const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
// add after other require() statements

const thumbsupply = require('thumbsupply');

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

// Serves the entire video file
// // server the sample.mp4 video when requested
// app.get("/video", (req, res) => {
//     res.sendFile("assets/0.mp4", { root: __dirname})
// })



// Allow cross origin request
app.use(cors({
    origin: ['http://localhost:3000']
}));

app.get('/videos', (req, res) => {
    console.log("Videos:", videos)
    res.status(200).json(videos);
});


app.get('/video/:id/data', (req, res) => {
    const id = parseInt(req.params.id, 10);
    console.log("ID:", id);
    res.status(200).json(id);
})

// Serve the video file in chunks
// add after app.get('/video/:id/data', ...) route
app.get('/video/:id', (req, res) => {
    const path = `assets/${req.params.id}.mp4`;
    const stat = fs.statSync(path);
    // Get the video file size
    const fileSize = stat.size;
    // Range from browser tells us were we are in the request
    // Note: Some browsers do not send range in inital request
    const range = req.headers.range;
    if (range) {
        // Get the first chuck of video
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1;
        const chunksize = (end-start) + 1;
        // Create a readStream using the start and end values of the
        // of a range
        const file = fs.createReadStream(path, {start, end});
        // Set the Response headers, with the chunk length and range
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        // Http code 206 signifies that the response contains partial content
        // Server will continue to make requests until all video is received
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }
});

// Route that handles generating thumbnails
app.get('/video/:id/poster', (req, res) => {
    /**
     * Thumbsupply's generateThumbnail method accepts a path to
     * a video and generates a thumbnail
     **/
    thumbsupply.generateThumbnail(`assets/${req.params.id}.mp4`)
    .then(thumb => res.sendFile(thumb));
});

// add after the app.get('/video/:id/poster', ...) route
app.get('/video/:id/caption', (req, res) => res.sendFile('assets/captions/sample.vtt', { root: __dirname }));

app.listen(4000, () => {
    console.log("Listening on port 4000")
})