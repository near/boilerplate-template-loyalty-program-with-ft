import { Worker, NearAccount, NEAR } from "near-workspaces";
import anyTest, { TestFn } from "ava";

const test = anyTest as TestFn<{
  worker: Worker;
  accounts: Record<string, NearAccount>;
}>;

const MAX_GAS = "300000000000000";
const FT_DEPOSIT = "19750000000000000000000000";

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
      name: "ft",
      ft_owner_id: merchant,
      token_name: "Reward Token",
      token_symbol: "RT",
      token_total_supply: "10000",
    },
    { gas: MAX_GAS, attachedDeposit: FT_DEPOSIT }
  );

  t.is(create, true);
  let is_initialized = await merchant.call(
    factory,
    "is_initialized",
    {},
    { gas: MAX_GAS, attachedDeposit: FT_DEPOSIT }
  );
  t.is(is_initialized, true);
});

test("isInitialized for non deployed contracts", async (t) => {
  const { factory, merchant } = t.context.accounts;

  let is_initialized = await merchant.call(
    factory,
    "is_initialized",
    {},
    { gas: MAX_GAS, attachedDeposit: FT_DEPOSIT }
  );

  t.is(is_initialized, false);
});
