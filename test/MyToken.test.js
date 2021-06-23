const Token = artifacts.require("MyToken");

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
const chaiBN = require("chai-bn")(web3.utils.BN);
const BN = web3.utils.BN;

chai.use(chaiBN);
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("My token tests", async accounts => {
const [ initialHolder, recipient, anotherAccount ] = accounts;

  it("all tokens should be in my account", async() => {
    const instance = await Token.deployed();
    let totalySupply = await instance.totalSupply();
    let balance = await instance.balanceOf(initialHolder);

    expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalySupply);
  });

  it("It's not possible to send more tokens than account 1 has", async () => {
    const instance = await Token.deployed();
    let balanceOfAccount = await instance.balanceOf(initialHolder);

    expect(instance.transfer(recipient, new BN(balanceOfAccount+1))).to.eventually.be.rejected;

    //check if the balance is still the same
    expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(balanceOfAccount);
  });

  it("is possible to send tokens between accounts", async() => {
    const sendTokens = 1;
    const instance = await Token.deployed();
    let totalSupply = await instance.totalSupply();
    expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
    expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
    expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber(totalSupply.sub(new BN(sendTokens)));
    expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
  });


});
