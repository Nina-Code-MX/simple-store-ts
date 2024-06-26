import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import bcrypt from 'bcryptjs';

class User extends Model {
    public id!: number;
    public email!: string;
    public password!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public comparePassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'User'
    }
);

User.beforeCreate((user: User) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
});

export default User;