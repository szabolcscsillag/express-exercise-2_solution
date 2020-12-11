const express = require('express');
const morgan = require('morgan');


const app = express();
app.use(morgan('tiny'));
const port = 3303;
const path = require('path');
const dataservice = require('./services/data-service');
app.set('views', './views');
app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});

app.use('/css', express.static(path.join(__dirname, '/public/css')));


app.get('/', (req, resp) => {
    resp.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.use('/users', require('./routes/user-router'));

