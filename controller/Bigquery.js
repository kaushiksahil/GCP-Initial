var BigqueryRouter = require("express").Router();

const bigqueryDataTransfer = require("@google-cloud/bigquery-data-transfer");
const { DataTransferServiceClient } =
  require("@google-cloud/bigquery-data-transfer").v1;
const { BigQuery } = require("@google-cloud/bigquery");

const name =
  "projects/atomic-sled-380105/locations//dataSources/atomic-sled-380105.all_billing_data";

//to get data source details
BigqueryRouter.get("/datasource", async (req, res) => {
  const datatransferClient = new DataTransferServiceClient();
  const request = {
    name,
  };

  console.log("in datasource");
  const response = await datatransferClient.getDataSource(request);
  console.log(response);
  res.status(200).json(response);
});

//to get table configurations
BigqueryRouter.get("/dataset", async (req, res) => {
  const bigquery = new BigQuery();
  const datasetId = "all_billing_data";
  const tableId = "gcp_billing_export_v1_01AFF6_61F5FC_07C0F4";

  const dataset = await bigquery.dataset(datasetId);

  const [table] = await dataset.table(tableId).get();

  console.log("Dataset:");
  console.log(dataset.metadata.datasetReference);

  res.status(200).json(table);
});

//to retrieve data
BigqueryRouter.get("/data", async (req, res) => {
  const bigquery = new BigQuery();
  const query = `SELECT *
      FROM \`all_billing_data.gcp_billing_export_v1_01AFF6_61F5FC_07C0F4\`
      WHERE project.ID="dockertest-380413"
      LIMIT 100`;

  const options = {
    query: query,
    location: "US",
  };

  const [job] = await bigquery.createQueryJob(options);
  console.log(`Job ${job.id} started.`);

  const [rows] = await job.getQueryResults();

  console.log("Rows: ", rows.length);
  res.status(200).json(rows);
});

module.exports = BigqueryRouter;
