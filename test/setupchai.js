"use strict";
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
const chaiBN = require("chai-bn")(web3.utils.BN);
const BN = web3.utils.BN;

chai.use(chaiBN);
chai.use(chaiAsPromised);

module.exports = chai;
