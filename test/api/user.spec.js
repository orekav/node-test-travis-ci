require("../setup.spec");
const app = require("../../src/app");
const supertest = require("supertest");
let agent;

const login = (anAgent, userCredentials) =>
	anAgent
		.post("/api/users/signIn")
		.send(userCredentials);

const logout = (anAgent) =>
	anAgent
		.post("/api/users/signOut");

describe("User endpoints", function () {
	this.beforeEach(async () => {
		agent = supertest.agent(app);
		const sequelize = require("../../src/models");
		await sequelize.sync({ force: true });

		const Customer = require("../../src/models/customer");
		const User = require("../../src/models/user");
		await Customer.create(
			{
				firstName: "Test",
				lastName: "Customer",
				user: {
					email: "foo@bar.test",
					password: "boo",
				},
			},
			{
				include: [User],
			}
		);
	});

	it("should return the dummy JSON message", function () {
		const response = agent.get("/api");
		return response
			.should.eventually.have.property("body")
			.be.deep.equal({ message: "All is well" });
	});

	it("should create a new user", function (done) {
		agent
			.post("/api/users/signUp")
			.send({
				firstName: "firstName",
				lastName: "lastName",
				email: "email@domain.com",
				password: "aPassword",
			})
			.expect(201)
			.end((err, res) => {
				err ? done(err) : done();
			});
	});

	it("should sign in", function (done) {
		login(agent, { email: "foo@bar.test", password: "boo" })
			.expect(200)
			.end((err, res) => {
				const { message, user } = res.body;
				message.should.be.equal("valid");
				user.should.have.property("email").equal("foo@bar.test");
				user.should.have.property("customer").have.property("firstName").equal("Test");
				user.should.have.property("customer").have.property("lastName").equal("Customer");

				agent
					.get("/api/users/me")
					.expect(200)
					.end((err, res) => {
						const user = res.body;
						user.should.have.property("email").equal("foo@bar.test");
						user.should.have.property("customer").have.property("firstName").equal("Test");
						user.should.have.property("customer").have.property("lastName").equal("Customer");
						err ? done(err) : done();
					});
			});
	});

	it("should sign out", async function () {
		await login(agent, { email: "foo@bar.test", password: "boo" });
		await logout(agent)
			.expect(302)
			.expect("Location", "/");

		return agent
			.get("/api/users/me")
			.expect(401);
	});

	it("should return unauthorized", function (done) {
		agent
			.get("/api/users/me")
			.expect(401)
			.end((err, res) => {
				err ? done(err) : done();
			});
	});
});