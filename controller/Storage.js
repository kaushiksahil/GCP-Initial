var StorageRouter = require("express").Router();

var { Storage } = require("@google-cloud/storage");

const projectId = "atomic-sled-380105";

StorageRouter.get("/buckets", async (req, res) => {
  const storage = new Storage({
    projectId,
  });
  const [buckets] = await storage.getBuckets();

  res.status(200).json(buckets);
});

module.exports = StorageRouter;
