const { Router } = require("express");
const database = require("../lib/database");
const body_parser = require("body-parser");

const router = Router();
router.use(body_parser);

router.post("get/menu", (req, res) => {
    database.query(`SELECT * FROM meal_options`, (err, rows) => {
        if (err) res.sendStatus(500);
        else res.status(200).send(rows);
    });
});
router.post("/order/lumpsum", (req, res) => {
  let trainee = req.body.trainee;
  let choices = req.body.choices;
  database.query(
    `SELECT id FROM trainees WHERE fname = '${trainee.fname}' AND lname = '${trainee.lname}'`,
    (err, rows) => {
      if (err) res.sendStatus(404);
      else {
        let trainee_id = row[0].id;
        Array.from(choices).forEach((c) => {
          database.query(
            `INSERT INTO lunch (meal_option_id, trainee_id, date) VALUES (${
              c.meal_option_id
            }, ${trainee_id}, '${new Date().toString()}')`
          );
        });
      }
    }
  );
});

module.exports = router;
