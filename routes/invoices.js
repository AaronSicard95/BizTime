const express = require("express");
const db = require("../db");

let router = new express.Router();

router.get('/', async function(req,res,next){
    try{
        const result = await db.query(
            `SELECT id, comp_Code, amt, paid, add_date, paid_date
            FROM invoices`
        );

        return res.json({invoices: result.rows})
    }
    catch(err){
        return next(err);
    }
})

router.get('/:id', async function(req,res,next){
    try{
        const result = await db.query(
            `SELECT id, c.code, c.name, amt, paid, add_date, paid_date
            FROM invoices
            INNER JOIN companies c ON invoices.comp_Code = c.code
            WHERE id = $1`,[req.params.id]
        );

        return res.json({invoices: result.rows})
    }
    catch(err){
        return next(err);
    }
})

router.post('/', async function(req,res,next){
    try{
        const result = await db.query(
            `INSERT INTO invoices (comp_Code, amt) 
            VALUES ($1, $2)
            RETURN id, comp_Code, amt, paid, add_date, paid_date`, [req.body.comp_Code, req.body.amt]
        );

        return res.json({invoices: result.rows})
    }
    catch(err){
        return next(err);
    }
})

router.put('/:id', async function(req,res,next){
    try{
        const result = await db.query(
            `UPDATE invoices SET amt = $1
            WHERE id = $2
            RETURN id, comp_Code, amt, paid, add_date, paid_date`,
        [req.body.amt, req.params.id]
        );

        return res.json({invoices: result.rows})
    }
    catch(err){
        return next(err);
    }
})

router.delete("/:id", async function(req, res, next){
    try{
        const result = await db.query(
        `DELETE FROM invoices
        WHERE code = $1`,[req.params.id]
    );

    return res.json({"message": 'Deleted'});
        }
    catch (err){
        return next(err);
    }
});

module.exports = router;