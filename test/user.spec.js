const Customer = require("../src/models/customer");
const User = require("../src/models/user");

describe("Dummy test suit", function () {
	it("Should create a new user", async function () {
		const newCustomer = await Customer.create(
			{
				firstName: "Nicolas",
				lastName: "Vaquero",
				user: {
					email: "foo@bar.test",
					password: "password",
				},
			},
			{
				include: [User],
			}
		);

		newCustomer.should.have.property("firstName").equal("Nicolas");
		newCustomer.should.have.property("lastName").equal("Vaquero");
		newCustomer.should.have.property("user").have.property("email").equal("foo@bar.test");

		return newCustomer.user.validPassword("password").should.eventually.be.true;
	})

	it("Should create the same password", async function () {
		const anUser = new User();
		const generetedPassword = await anUser.generateHash("1234podfsdpof");
		anUser.password = generetedPassword;
		return anUser.validPassword("1234podfsdpof").should.eventually.be.true;
	});
});