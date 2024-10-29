"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const documentController_1 = require("../controllers/documentController");
const multerConfig_1 = require("../config/multerConfig");
const router = express_1.default.Router();
router.post('/extract', multerConfig_1.upload.single('document'), documentController_1.extractDocumentData);
exports.default = router;
