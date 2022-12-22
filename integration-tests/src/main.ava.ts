import { Worker, NearAccount, NEAR } from "near-workspaces";
import anyTest, { TestFn } from "ava";
import { Near } from "near-api-js";
const { utils, keyStore } = require("near-api-js");


const test = anyTest as TestFn<{
  worker: Worker;
  accounts: Record<string, NearAccount>;
}>;

const MAX_GAS = "300000000000000";
const TOTAL_DEPOSIT = "4989140000000000000000000";

test.beforeEach(async (t) => {
  // Init the worker and start a Sandbox server
  const worker = await Worker.init();

  // Get root account
  const root = worker.rootAccount;

  // Create test accounts
  const merchant = await root.createSubAccount("merchant");
  const factory = await root.createSubAccount("factory");

  // Deploy factory contract
  await factory.deploy(process.argv[2]);

  // Save state for test runs, it is unique for each test
  t.context.worker = worker;
  t.context.accounts = {
    factory,
    merchant
  };
});

test.afterEach(async (t) => {
  await t.context.worker.tearDown().catch((error) => {
    console.log("Failed tear down the worker:", error);
  });
});

test("create_factory_subaccount_and_deploy tests", async (t) => {
  const { factory, merchant } = t.context.accounts;

  let create = await merchant.call(
    factory,
    "create_factory_subaccount_and_deploy",
    {
      token_name: "ft",
      token_symbol: "ft",
      token_total_supply: "10000",
    },
    { gas: MAX_GAS, attachedDeposit: TOTAL_DEPOSIT }
  );

  t.true(create);

  const has = await factory.view("user_has_program", { account_id: merchant.accountId })
  t.true(has)

  const hasNot = await factory.view("user_has_program", { account_id: "somebody.near" })
  t.false(hasNot)

  const program: Program = await factory.view("user_program", { account_id: merchant.accountId })
  t.is(program.ft.account_id, `merchant-ft.${factory.accountId}`)
});

interface FTMetadata {
  account_id: string
  manager: string,
  token_name: String,
  token_symbol: String,
  token_total_supply: string,
}

interface Program {
  ft: FTMetadata
  manager: string
}