import express from 'express';



const app = express()

const PORT = 3500;

app.get('/', (req, res) => {
    res.send('Hello World22!')
})



app.listen(PORT, (err) => {
    if(err){
        return console.log('server error: ', err);
    }
    console.log(`Example app listening on port ${PORT}`)
})
