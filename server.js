const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, ()=>{
    console.log(`Server is listening from: localhost:${PORT}`)
})

const quotesRouter = express.Router();
app.use('/api/quotes', quotesRouter);


//Get a random quote
quotesRouter.get('/random', (req, res)=>{
    const randomQuote = getRandomElement(quotes)
    res.send({quote: randomQuote})
});

//Get all quotes or quotes by a person
quotesRouter.get('/', (req, res)=>{  
    const person = req.query.person;
    if(person){
        const personQuotes = quotes.filter((quote) => quote.person === person);
        res.send({quotes: personQuotes})
    } else{
        res.send({quotes: quotes});
    }
});


//Add a new quote
quotesRouter.post('/', (req, res)=>{  
    const person = req.query.person;
    const quote = req.query.quote;    
    if(person && quote){
        quotes.push(req.query)
        res.send({quotes: quote, person})
    } else{
        res.status(400).send('Missing information');
    }
});

