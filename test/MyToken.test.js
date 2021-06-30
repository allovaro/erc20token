const Token = artifacts.require("MyToken");

require("dotenv").config({path: "../.env"});

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("My token tests", async accounts => {
  const [ initialHolder, recipient, anotherAccount ] = accounts;

  beforeEach(async() => {
    this.myToken = await Token.new(process.env.INITIAL_TOKENS);
  });

  it("all tokens should be in my account", async() => {
    const instance = this.myToken;
    let totalySupply = await instance.totalSupply();
    let balance = await instance.balanceOf(initialHolder);

    return expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalySupply);
  });

  // it("is possible to send tokens between accounts", async() => {
  //   const sendTokens = 1;
  //   const instance = this.myToken;
  //   let totalSupply = await instance.totalSupply();
  //   expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
  //   expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
  //   expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber(totalSupply.sub(new BN(sendTokens)));
  //   return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
  // });

  it("It's not possible to send more tokens than account 1 has", async () => {
    const instance = this.myToken;
    let balanceOfAccount = await instance.balanceOf(initialHolder);

    expect(instance.transfer(recipient, new BN(balanceOfAccount+1))).to.eventually.be.rejected;

    //check if the balance is still the same
    return expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(balanceOfAccount);
  });




});
