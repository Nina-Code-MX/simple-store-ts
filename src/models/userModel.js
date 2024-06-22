"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class User extends sequelize_1.Model {
    comparePassword(password) {
        return bcryptjs_1.default.compareSync(password, this.password);
    }
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
        unique: true
    },
    password: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false
    }
}, {
    sequelize: database_1.default,
    modelName: 'User'
});
User.beforeCreate((user) => {
    user.password = bcryptjs_1.default.hashSync(user.password, bcryptjs_1.default.genSaltSync(10));
});
exports.default = User;
