var BillingRouter = require("express").Router();
const { CloudBillingClient } = require("@google-cloud/billing");
const { BudgetServiceClient } = require("@google-cloud/billing-budgets").v1;

BillingRouter.get("/accounts", async (req, res) => {
  const client = new CloudBillingClient();

  const projectName = "My First Project";

  async function listBillingAccounts() {
    const [accounts] = await client.listBillingAccounts({
      projectName,
    });
    console.info(`found ${accounts.length} billing accounts:`);
    for (const account of accounts) {
      console.log(account);
      console.info(`${account.displayName}:`);
      console.info(`\topen: ${account.open}`);
      console.info(`\tparentBillingAccount: ${account.masterBillingAccount}`);
    }
    return accounts;
  }
  const accounts = await listBillingAccounts();
  res.status(200).json(accounts);
});

BillingRouter.get("/budgets", async (req, res) => {
  const client = new BudgetServiceClient();

  const billingAccount = "billingAccounts/01AFF6-61F5FC-07C0F4";

  async function quickstart() {
    const [result] = await client.listBudgets({
      parent: billingAccount,
    });
    console.info(result);
    return result;
  }
  const budgetData = await quickstart();
  res.status(200).json(budgetData);
});

module.exports = BillingRouter;
