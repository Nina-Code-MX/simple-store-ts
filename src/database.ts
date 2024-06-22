import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
    dialect: "sqlite",
    logging: false
});

export default sequelize;