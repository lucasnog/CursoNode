"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutes = void 0;
const express_1 = require("express");
const categoriesRoutes = (0, express_1.Router)();
exports.categoriesRoutes = categoriesRoutes;
const categories = [];
categoriesRoutes.post("/categories", (request, response) => {
    const { name, description } = request.body;
    categories.push({
        name,
        description,
    });
    return response.status(201).send;
});
