import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

class Product extends Model {
    public id!: number;
    public name!: string;
    public price!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Product'
    }
);

export default Product;