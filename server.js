const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname+"/dist/app-ui"));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/dist/app-ui/index.html'));
});

var server = app.listen(process.env.PORT || 8080, () => {
    var port = server.address().port;
});