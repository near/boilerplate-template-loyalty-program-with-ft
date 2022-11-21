import { Worker, NearAccount, NEAR } from "near-workspaces";
import anyTest, { TestFn } from "ava";

const test = anyTest as TestFn<{
  worker: Worker;
  accounts: Record<string, NearAccount>;
}>;

const MAX_GAS = "300000000000000";
const FT_DEPOSIT = "197907910000000000000000000";

test.beforeEach(async (t) => {
  // Init the worker and start a Sandbox server
  const worker = await Worker.init();

  // Get root account
  const root = worker.rootAccount;

  // Create test accounts
  const alice = await root.createSubAccount("alice", {initialBalance: "19790791000000000000000000000"});
  const beneficiary = await root.createSubAccount("beneficiary");
  const factory = await root.createSubAccount("factory");

  // Deploy factory contract
  await factory.deploy(process.argv[2]);

  // Save state for test runs, it is unique for each test
  t.context.worker = worker;
  t.context.accounts = {
    factory,
    alice,
    beneficiary,
  };
});

test.afterEach(async (t) => {
  await t.context.worker.tearDown().catch((error) => {
    console.log("Failed tear down the worker:", error);
  });
});

test("create_factory_subaccount_and_deploy tests", async (t) => {
  const { factory, alice, beneficiary } = t.context.accounts;

  let create = await alice.call(
    factory,
    "create_factory_subaccount_and_deploy",
    { name: "ft",
    ft_owner_id: beneficiary, 
    token_name: "TOKEN NAME", 
    token_symbol: "SYMBOL", 
    token_total_supply: "10000", },
    { gas: MAX_GAS, attachedDeposit: FT_DEPOSIT }
  );

  t.is(create, true);
});
