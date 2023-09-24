"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const todos = [];
router.get("/", (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post("/", (req, res, next) => {
    const text = req.body.text;
    if (!text)
        return res.status(400).json({
            success: false,
            message: "Text is required!",
        });
    const newTodo = {
        id: new Date().toISOString(),
        text: text,
    };
    todos.push(newTodo);
    res.status(201).json({
        success: true,
        message: "Todo added Successfully!",
    });
});
router.put("/:id", (req, res, next) => {
    const id = req.params.id;
    const { text } = req.body;
    const index = todos.findIndex((todo) => todo.id == id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Todo not Found!",
        });
    }
    const updateTodo = {
        id: id,
        text: text,
    };
    todos[index] = updateTodo;
    res.status(200).json({
        success: true,
        message: "Todo updated Successfully!",
    });
});
router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    const index = todos.findIndex((todo) => todo.id == id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Todo not found!",
        });
    }
    todos.splice(index, 1);
    res.status(200).json({
        success: true,
        message: "Todo deleted successfully!",
    });
});
exports.default = router;
