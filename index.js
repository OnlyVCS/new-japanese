const express = require('express');
const port = 3000;
const app = express();

const multer = require('multer');
const upload = multer();

const data = require('./public/json/char.json');
const hiragana = data.hiragana;
const katakana = data.katakana;

app.set('view engine', 'ejs');
app.use('/public', express.static('./public'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let round = 0;
let charArray = [];
let score = 0;

function resetValues() {
    score = 0;
    round = 0;
    charArray = [];
}

app.get('/', (req, res) => {
    resetValues();
    res.render('index')
})


function createArray(name) {
    for(let i = 0; i < 10; i++){
        if(name == 'hiragana'){
            let lastChar = charArray[i-1];
            let newChar = hiragana[Math.floor(Math.random() * hiragana.length)];
            if (newChar != lastChar){
                charArray.push(newChar);
            } else {
                i--;
            }
        } else {
            charArray.push(katakana[Math.floor(Math.random() * katakana.length)])
        }
    }
}

app.get('/hiragana', (req, res) => {
    if(round == 0){
        createArray('hiragana');
    }
    if (round < 10) {
        res.render('hiragana', { char:  charArray[round]});
    } else {
        res.render('results', { score: score })
        resetValues()
    }
})

app.get('/katakana', (req, res) => {
    if(round == 0){
        createArray('katakana');
    }
    if (round < 10) {
        res.render('katakana', { char:  charArray[round]});
    } else {
        res.render('results', { score: score })
        resetValues()
    }
})

// app.get('/score', (req, res) => {
//     res.render('results', { score: score })
// })

app.post('/submit', upload.none(), (req, res) => {
    let answer = req.body.answer;
    if(answer) {
        if(answer.toLowerCase() == charArray[round].romaji) {
            res.json({ success: true })
            score++;
        } else {
            res.json({ success: false })
        }
    } else {
        console.log('else')
        res.json({ success: false })
    }
    round ++;
})

app.listen(port, () => {
    console.log("Servidor: https://localhost:" + port)
})