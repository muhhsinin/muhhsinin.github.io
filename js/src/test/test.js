/**
 * Created by kawnayeen on 2/6/17.
 */
(function () {
    "use strict";
    let mocha = require('mocha');
    let expect = require('chai').expect;

    describe("hello world test suite", function () {
        it("hello world test", function () {
            expect(true).to.be.true;
        });
    });

}());