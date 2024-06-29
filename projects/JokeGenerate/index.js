const express = require('express');

const data = require('./data.js')
const app = express();

const PORT = 8080;

const jokeMiddleware = (req, res, next) => {
    req.joke = "This is a joke";
    console.log('Middleware triggered');
    next();
};
const imageMiddleware = (req,res,next) => {
    console.log("Image middleware triggered")
    next()
}

app.get('/jokes', jokeMiddleware, (req, res) => {
    const randomIndex = Math.floor(Math.random() * data.jokes.length);
    return res.status(200).json(data.jokes[randomIndex]);
});

app.get('/joke/:jokeId', (req, res) => {
    const jokeId = Number(req.params.jokeId);
    if (isNaN(jokeId) || jokeId < 0) {
        return res.status(400).json({ error: "Invalid joke id" })
    }
    const joke = data.jokes.find(joke => joke.id === jokeId);
    if(!joke){
        return res.status(404).json({error:"joke not found"})
    }
   return res.status(200).json(joke)
})


app.get('/images',imageMiddleware,(req,res) =>{
    const randomIndex = Math.floor(Math.random() * data.images.length);
    return res.status(200).json(data.images[randomIndex])
});

app.get('/image/:imageId', (req, res) => {
    const imageId = Number(req.params.imageId);
    if (isNaN(imageId) || imageId < 0) {
        return res.status(400).json({ error: "Invalid image id" });
    }
    const image = data.images.find(image => image.id === imageId);
    if (!image) {
        return res.status(404).json({ error: "Image not found" });
    }
    return res.status(200).json(image);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

// async function getRandomJoke() {
//     // Replace with your joke-fetching logic
//     return "This is a random joke.";
// }

// async function getRandomImage() {
//     const response = await axios.get('https://source.unsplash.com/random');
//     return response.request.res.responseUrl;
// }

// const express = require('express');
// const axios = require('axios');
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Existing random joke route
// app.get('/api/jokes/random', async (req, res) => {
//     const joke = await getRandomJoke();
//     res.json({ joke });
// });

// // New route for random images
// app.get('/api/images/random', async (req, res) => {
//     try {
//         const imageUrl = await getRandomImage();
//         res.json({ image: imageUrl });
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching image' });
//     }
// });

// // Combined route
// app.get('/api/random', async (req, res) => {
//     try {
//         const joke = await getRandomJoke();
//         const image = await getRandomImage();
//         res.json({ joke, image });
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching data' });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

// async function getRandomJoke() {
//     // Replace with your joke-fetching logic
//     return "This is a random joke.";
// }

// async function getRandomImage() {
//     const response = await axios.get('https://source.unsplash.com/random');
//     return response.request.res.responseUrl;
// }
