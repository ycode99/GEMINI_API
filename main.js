const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World! Gemini');
})

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//const prompt = "tell me a joke";

const generate = async (prompt) => {
    try {
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        return result.response.text();
    } catch (error) {
        console.log(error);
    }
}

//generate();

app.post('/api/content', async(req, res) => {
    try {
        const data = req.body.question;
        const result = await generate(data);
        res.send({
            "result": result
        })
    } catch (error) {
        res.send("error: " + error)
        
    }
})

app.listen(3000, () => {
    console.log('App listening on port 3000!');
})