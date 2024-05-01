const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function averageAgeOfUsers(req, res) {
  try {
    await client.connect();
    const database = client.db('User');
    const collection = database.collection('Details');

    const aggregationResult = await collection.aggregate([
      {
        $group: {
          _id: null,
          averageAge: { $avg: "$age" },
          users: { $push: "$$ROOT" }
        }
      }
    ]).toArray();

    if (aggregationResult.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    const result = aggregationResult[0];
    res.json(result);
  } catch (err) {
    console.error("Error calculating average age:", err);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await client.close();
  }
}

router.get('/average-age', averageAgeOfUsers);

module.exports = router;
