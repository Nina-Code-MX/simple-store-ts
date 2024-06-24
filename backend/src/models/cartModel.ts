import { Model, DataTypes, BelongsToGetAssociationMixin } from 'sequelize';
import sequelize from '../database';
import Product from './productModel';

class Cart extends Model {
    public id!: number;
    public userId!: number;
    public productId!: number;
    public quantity!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    // public Product!: BelongsToGetAssociationMixin<Product>;
    public getProduct!: BelongsToGetAssociationMixin<Product>;
    public Product?: Product;
}

Cart.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Cart'
    }
);

Cart.belongsTo(Product, { foreignKey: 'productId', as: 'Product'});

export default Cart;