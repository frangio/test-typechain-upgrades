import hre from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

import { Greeter__factory } from "../typechain/factories/Greeter__factory";
import { Signers } from "../types";
import { shouldBehaveLikeGreeter } from "./Greeter.behavior";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await hre.ethers.getSigners();
    this.signers.admin = signers[0];
  });

  describe("Greeter", function () {
    beforeEach(async function () {
      const greeting: string = "Hello, world!";

      const greeter = await hre.upgrades.deployProxy<typeof Greeter__factory>(Greeter__factory, [greeting]);

      this.greeter = greeter;
    });

    shouldBehaveLikeGreeter();
  });
});
