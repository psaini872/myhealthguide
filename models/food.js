import mongoose from "mongoose";
const meals = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
  },
  nutrients: {
    Calories: {
      type: Number,
      default: 0,
    },
    Carbs: {
      type: Number,
      default: 0,
    },
    Protein: {
      type: Number,
      default: 0,
    },
    Fats: {
      type: Number,
      default: 0,
    },
  },
  date: {
    type: String,
    // default: Date.now,
  },
  mealtime: {
    type: String,
    enum: {
      values: ["Breakfast", "Lunch", "Snacks", "Dinner"],
      message: "{VALUE} is not supported",
    },
  },
  qunatity: {
    ingram: {
      type: Number,
      default: 100,
    },
    number: {
      type: Number,
      default: 1,
    },
  },
});
export default mongoose.model("mealData", meals);
