const { Router } = require("express");
const database = require("../lib/database");
const body_parser = require("body-parser");

const router = Router();
router.use(body_parser.json());

router.post("/get/menu", (req, res) => {
  database.query(`SELECT * FROM meal_options`, (err, rows) => {
    if (err) res.sendStatus(500);
    else res.status(200).send(rows);
  });
});
router.post("/get/trainee", (req, res) => {
  database.query(
    `SELECT * FROM trainees WHERE fname = '${req.body.fname}' AND lname = '${req.body.lname}'`,
    (err, rows) => {
      if (err) res.status(409).send(false);
      else res.status(200).send(rows.length == 1 ? true : false);
    }
  );
});
router.post("/order/lumpsum", (req, res) => {
  let flag = true;
  let trainee = req.body.trainee;
  let orders = req.body.orders;
  database.query(
    `SELECT id FROM trainees WHERE fname = '${trainee.fname}' AND lname = '${trainee.lname}'`,
    (err, rows) => {
      if (err) res.sendStatus(404);
      else {
        if (rows.length == 1) {
          let trainee_id = rows[0].id;
          database.query(
            `SELECT * FROM lunch WHERE trainee_id = ${trainee_id}`,
            (err, rows) => {
              if (err) res.sendStatus(500);
              else {
                if (rows.length > 0) {
                  res.status(418).send(false);
                } else {
                  [...orders].forEach((c) => {
                    database.query(
                      `INSERT INTO lunch (meal_option_id, trainee_id, date) VALUES (${
                        c.meal_option_id
                      }, ${trainee_id}, '${new Date()
                        .toISOString()
                        .slice(0, 10)}')`,
                      (err2, rows2) => {
                        if (err2) {
                          console.log(err2);
                          flag = false;
                        }
                      }
                    );
                  });
                  res.status(flag ? 200 : 409).send(flag);
                }
              }
            }
          );
        } else res.status(404).send(false);
      }
    }
  );
});

module.exports = router;
