const chaiAsPromised = require("chai-as-promised");
const chai = require("chai");

chai.use(chaiAsPromised);
chai.should();

const sequelize = require("../src/models/index");

before(async () => {
	await sequelize.sync({ force: true });
});

after(async () => {
	await sequelize.close();
});