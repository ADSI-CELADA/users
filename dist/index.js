"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app_1 = __importDefault(require("./app"));
const Config_1 = require("./config/Config");
app_1.default.use((0, express_1.json)());
app_1.default.listen(Config_1.PORT, () => {
    console.log(`Server running uvub ${Config_1.PORT}`);
});
