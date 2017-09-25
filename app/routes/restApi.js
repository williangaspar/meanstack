const router = require('express').Router();

const Db = require(".././db");
const db = Db.db;
const Delivery = Db.Delivery;

router.get("/deliveries", (req, res) => {
  Delivery.find().limit(100).exec(onResult);

  function onResult(err, data) {
    if (!err) {
      res.json(data);
    } else {
      res.json({ error: 500, message: "Erro ao ler banco de dados" });
    }
  }
});

router.post("/deliveries", (req, res) => {
  const delivery = new Delivery(req.body);

  delivery.save((err) => {
    if (err) {
      res.json({ error: 400 });
    } else {
      res.json({ success: true });
    }
  });
});

router.delete("/deliveries", (req, res) => {
  Delivery.remove({}, (err) => {
    if (err)
      res.json({ error: 500 });
    else
      res.json({ success: true });
  });
});

module.exports = router;
