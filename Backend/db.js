const mongoose = require('mongoose');
const mongoDB = async () => {
  try {
    const uri = "mongodb+srv://purva:dbFoodie@cluster0.bfyds.mongodb.net/Foodie?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");

    const db = mongoose.connection.db;
    const foodCollection = db.collection("food_items");
    const foodCatCollection = db.collection("food_category");
    const data = await foodCollection.find({}).toArray();
    const food_catdata = await foodCatCollection.find({}).toArray();
    
    if (data.length > 0) {
      global.food_items = data;
      global.food_category = food_catdata;
      
    } else {
      console.log("No food items found in the collection.");
    }
  }
  catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
module.exports = mongoDB;