var express = require('express');
var router = express.Router();


const sequenceGenerator = require('./sequenceGenerator');
const PortfolioItem = require("../models/PortfolioItem");

router.get('/', (req, res, next) => {
    PortfolioItem.find()
        .then(item => {
            res
                .status(200)
                .json({
                    message: "Portfolio received successfully!",
                    portfolio: item
                });

            return item;
        })
        .catch(error => {
            res
                .status(500)
                .json({
                    error: error,
                    message: "Failed to receive portfolio"
                })
        })
});

router.post('/', (req, res, next) => {
    const maxItemId = sequenceGenerator.nextId("portfolio");

    const item = new PortfolioItem({
        id: maxItemId,
        name: req.body.name,
        description: req.body.description,
        link: req.body.link,
        date: req.body.date
    });

    item.save()
        .then(createdItem => {
            res.status(201).json({
                message: "Item added successfully",
                newItem: createdItem
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "An error occurred",
                error: error
            });
        });
});

router.put('/:id', (req, res, next) => {
    PortfolioItem.findOne({ id: req.params.id })
        .then(item => {
            item.name = req.body.name;
            item.description = req.body.description;
            item.link = req.body.link;
            item.date = req.body.date;

            PortfolioItem.updateOne({ id: req.params.id }, item)
                .then(result => {
                    res.status(204).json({
                        message: "Item updated succesfully",
                        item: item
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'An error occurred',
                        error: error
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                message: "Item not found",
                error: { item: "Item not found" }
            });
        });
});

router.delete("/:id", (req, res, next) => {
    PortfolioItem.findOne({ id: req.params.id })
        .then(item => {
            PortfolioItem.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({
                        message: "Item deleted successfully"
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: "An error occurred",
                        error: error
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                message: "Item not found",
                error: { item: "Item not found" }
            });
        });
});

module.exports = router; 