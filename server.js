const express = require('express');
const cors = require('cors');
//const json = require('./budget-data.json')
const app = express();
const port = 3000;

app.use(cors());

const json = {
    "myBudget": [
        {
            "title": "Eat out",
            "budget": 25
        },
        {
            "title": "Utilities",
            "budget": 45
        },
        {
            "title": "Rent",
            "budget": 110
        },
        {
            "title": "Grocery",
            "budget": 100
        },
        {
            "title": "Mobile",
            "budget": 27
        },
        {
            "title": "Internet",
            "budget": 10
        },
        {
            "title": "University",
            "budget": 150
        },
        {
            "title": "Netflix",
            "budget": 50
        }
    ]
}
app.get('/budget', (req, res) => {
    res.json(json);
});

app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`);
});