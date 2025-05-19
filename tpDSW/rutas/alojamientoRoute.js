import alojamientos from './alojamientos.json' assert {type: 'json'};

app.get("/alojamientos", (req, res) => {
    res.json(alojamientos)
})