//Dependencies
const express = require('express');
const cors = require('cors');

const app = express();

// cors

var corsOptions = {
    origin: 'https://localhost:8030'
}

// Middleware
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: true }));


// Testing API
app.get('/', (req, res) => {
    res.json({ message: 'hello from api' });
});

//port
const PORT = process.env.PORT || 3000;

//Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

