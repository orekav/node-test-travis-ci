describe("Dummy test suit", function () {
	it("Should be in PORT 8080", function (done) {
		if (process.env.PORT === 8080)
			done();
		else
			throw new Error(`The port was ${process.env.PORT}`);
	});
});