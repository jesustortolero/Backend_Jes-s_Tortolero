var express = new require('express');
var data = new require('./data/data');
var _ = require('underscore');

var app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/all", function (req, res) {

    res.send(data);
});

app.get("/filtered", function (req, res) {

    var filteredData = _.filter(data, function (element) {

        var containsFilter = false;
        var precio = element["Precio"];
        precio = parseFloat(precio.replace(',', '').replace('$', ''));


        if (req.query.ciudad && req.query.tipo) {
            if ((req.query.ciudad && element["Ciudad"] == req.query.ciudad) && (req.query.tipo && element["Tipo"] == req.query.tipo)) {

                return precio >= req.query.precioMinimo && precio <= req.query.precioMaximo;

            };

        } else if (req.query.ciudad) {

            if (req.query.ciudad && element["Ciudad"] == req.query.ciudad) {

                return precio >= req.query.precioMinimo && precio <= req.query.precioMaximo;

            };

        } else if (req.query.tipo) {

            if (req.query.tipo && element["Tipo"] == req.query.tipo) {

                return precio >= req.query.precioMinimo && precio <= req.query.precioMaximo;

            };

        } else {
            if (req.query.precioMinimo && req.query.precioMaximo) {

                return precio >= req.query.precioMinimo && precio <= req.query.precioMaximo;

            }
        }
    });
    console.log("Filtro: ", req.query.id);
    res.send(filteredData);
});

app.listen(3000, function () {
    console.log("Start in port 3000");
})