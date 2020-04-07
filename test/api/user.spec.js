const app = require("../../src/app");
const supertest = require("supertest");
const agent = supertest.agent(app);

describe("User Endpoints", function () {
	it("Should return the dummy JSON message", function () {
		const response = agent.get("/api");
		return response
			.should.eventually.have.property("body")
			.be.deep.equal({ message: "All is well" });
	});

	it("Should create a new user", function (done) {
		agent
			.post("/api/user/signUp")
			.send({
				firstName: "Nicolas",
				lastName: "Vaquero",
				email: "foo@bar.test",
				password: "password",
			})
			.expect(201)
			.end((err, res) => {
				err ? done(err) : done();
			});
	});

});