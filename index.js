const express = require('express');
const app = express();
const port = 3000;
const multer = require('multer');
const upload = multer();

app.set('view engine', 'ejs');
app.use('/public', express.static('./public'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const array = [20, 3, 4, 5];
// console.log(array + '\n' + Math.min(...array));

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/hiragana', (req, res) => {
    res.render('hiragana');
})

app.post('/submit', upload.none(), (req, res) => {
    let answer = req.body.answer;
    if(answer) {
        if(answer == 'a') {
            res.json({ success: true })
        } else {
            res.json({ success: false })
        }
    } else {
        console.log('else')
        res.json({ success: false })
    }
})

app.listen(port, () => {
    console.log("Servidor: https://localhost:" + port)
})