const express = require("express");
const db = require("../db");

let router = new express.Router();

router.get("/", async function(req, res, next){
    try{
        const result = await db.query(
        `SELECT code, name
        FROM companies
        ORDER BY name`
    );

    return res.json({"companies": result.rows});
        }
    catch (err){
        return next(err);
    }
});

router.get("/:code", async function(req, res, next){
    try{
        const result = await db.query(
        `SELECT code, name, i.id, i.amt, i.paid, i.add_date, i.paid_date
        FROM companies
        JOIN invoices i ON i.comp_Code = companies.code
        WHERE code = $1`,[req.params.code]
    );

    return res.json({"companies": result.rows});
        }
    catch (err){
        return next(err);
    }
});

router.post("/", async function(req, res, next){
    try{
        const result = await db.query(
        `INSERT INTO companies (name, code, description)
        VALUES ($1,$2,$3)
        RETURN name, code, description`, 
        [req.body.company.name, req.body.company.code, req.body.company.description]
    );

    return res.json({"companies": result.rows});
        }
    catch (err){
        return next(err);
    }
});

router.put("/:code", async function(req, res, next){
    try{
        const result = await db.query(
        `UPDATE companies SET name = $1, description = $2
        WHERE code = $3
        RETURN code, name, description`,[req.body.name, req.body.description, req.params.code]
    );

    return res.json({"companies": result.rows});
        }
    catch (err){
        return next(err);
    }
});

router.delete("/:code", async function(req, res, next){
    try{
        const result = await db.query(
        `DELETE FROM companies
        WHERE code = $1`,[req.params.code]
    );

    return res.json({"message": 'Deleted'});
        }
    catch (err){
        return next(err);
    }
});

module.exports = router;