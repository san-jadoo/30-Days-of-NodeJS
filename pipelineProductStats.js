const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";

const dbName = "Product";

async function main() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Connected to the MongoDB server");

    const db = client.db(dbName);

    const productStats = await getProductStatistics(db);
    console.log("Product statistics:", productStats);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the connection
    await client.close();
    console.log("Connection closed");
  }
}
async function getProductStatistics(db) {
  const pipeline = [
    {
      $group: {
        _id: null,
        totalProducts: { $sum: 1 },
        averagePrice: { $avg: "$price" },
        highestQuantity: { $max: "$quantity" }
      }
    }
  ];

  try {
    const result = await db.collection("products").aggregate(pipeline).toArray();
    if (result.length > 0) {
      return result[0];
    } else {
      throw new Error("No products found");
    }
  } catch (error) {
    console.error("Error retrieving product statistics:", error);
    return null;
  }
}

main();
