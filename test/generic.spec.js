const app = require("../src/app");
const supertest = require("supertest");
const agent = supertest.agent(app);
const chaiAsPromised = require("chai-as-promised");
const chai = require("chai");

chai.use(chaiAsPromised);
chai.should();

describe("Dummy test suit", function () {
	it("Should be in PORT 8080", function (done) {
		if (process.env.PORT === "8080")
			done();
		else
			throw new Error(`The port was ${process.env.PORT}`);
	});

	it("Should return the dummy JSON message", function () {
		const response = agent.get("/");
		return response
			.should.eventually.have.property("body")
			.be.deep.equal({ message: "All is well" });
	});
});