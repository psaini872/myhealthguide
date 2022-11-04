import React, { createContext, useContext, useEffect } from "react";
import axios from "axios";
import BreakfastImg from "../assets/images/breakfast.jpeg";
import SancksImg from "../assets/images/Snacks.jpeg";
import LunchImg from "../assets/images/lunch.jpeg";
import DinnerImg from "../assets/images/Dinner.jpeg";
import { useState } from "react";
const UserContext = createContext();

const AppProvider = ({ children }) => {
  // Get DATE STring

  const d = new Date();
  const todaydate = d.toDateString();
  const prependZero = (number) => {
    if (number <= 9) return "0" + number;
    else return number.toString();
  };
  const datestring =
    prependZero(d.getDate()) +
    prependZero(d.getMonth() + 1) +
    d.getFullYear().toString();

  // Beckend Connection

  const authFetch = axios.create({
    baseURL: "api/v1",
  });

  //  Nutrision State for today data

  const [Breakfast, setBreakfast] = useState({
    Calories: 0,
    Carbs: 0,
    Protein: 0,
    Fats: 0,
  });
  const [Lunch, setLunch] = useState({
    Calories: 0,
    Carbs: 0,
    Protein: 0,
    Fats: 0,
  });
  const [Sancks, setSancks] = useState({
    Calories: 0,
    Carbs: 0,
    Protein: 0,
    Fats: 0,
  });
  const [Dinner, setDinner] = useState({
    Calories: 0,
    Carbs: 0,
    Protein: 0,
    Fats: 0,
  });
  const [updated, setUpdated] = useState(true);

  const [breakfastitem, setBreakfastitem] = useState([]);
  const [lunchitem, setLunchitem] = useState([]);
  const [snacksitem, setSnacksitem] = useState([]);
  const [dinneritem, setDinneritem] = useState([]);

  // state report data

  const [reportdata, setReportdata] = useState({});

  // Store Searched Food

  const [searchedfoods, setSearchedfoods] = useState([]);

  // Set Food State for data for get and report request

  const setmeal = ({
    _id,
    totalCalories,
    totalCarbs,
    totalProtein,
    totalFats,
  }) => {
    if (_id === "Breakfast") {
      setBreakfast({
        Calories: totalCalories,
        Carbs: totalCarbs,
        Protein: totalProtein,
        Fats: totalFats,
      });
    }
    if (_id === "Lunch") {
      setLunch({
        Calories: totalCalories,
        Carbs: totalCarbs,
        Protein: totalProtein,
        Fats: totalFats,
      });
    }
    if (_id === "Snacks") {
      setSancks({
        Calories: totalCalories,
        Carbs: totalCarbs,
        Protein: totalProtein,
        Fats: totalFats,
      });
    }
    if (_id === "Dinner") {
      setDinner({
        Calories: totalCalories,
        Carbs: totalCarbs,
        Protein: totalProtein,
        Fats: totalFats,
      });
    }
  };

  const setitem = (meal) => {
    if (meal._id === null) {
      setReportdata(meal);
    }
    if (meal._id === "Breakfast") {
      setBreakfastitem(meal.items);
    }
    if (meal._id === "Lunch") {
      setLunchitem(meal.items);
    }
    if (meal._id === "Snacks") {
      setSnacksitem(meal.items);
    }
    if (meal._id === "Dinner") {
      setDinneritem(meal.items);
    }
  };

  // Add new Food in Diary

  const addFood = async (mealtime, nutrients, label, InGram, NoOfServing) => {
    const { ENERC_KCAL, CHOCDF, PROCNT, FAT } = nutrients;
    // console.log(label, { ENERC_KCAL, CHOCDF, PROCNT, FAT }, mealtime, amount);
    // console.log(nutrients);
    const check = {
      name: label,
      nutrients: {
        Calories: Math.round((ENERC_KCAL / 100) * (InGram * NoOfServing)),
        Carbs: Math.round((CHOCDF / 100) * (InGram * NoOfServing)),
        Protein: Math.round((PROCNT / 100) * (InGram * NoOfServing)),
        Fats: Math.round((FAT / 100) * (InGram * NoOfServing)),
      },
      date: datestring,
      mealtime,
      qunatity: {
        ingram: InGram,
        number: NoOfServing,
      },
    };
    console.log(check);
    try {
      axios.post("https://mynutritionguide.herokuapp.com/api/v1/food", check);
      // await authFetch.post(`/food`, check);
      console.log("Succ Done");

      setUpdated((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  // Get food data of today

  useEffect(() => {
    const getTodayData = async () => {
      try {
        // const food = await authFetch.get(`/food/${datestring}`);
        const food = await axios.get(
          `https://mynutritionguide.herokuapp.com/api/v1/food/${datestring}`
        );
        // eslint-disable-next-line array-callback-return
        food.data.map((meal) => {
          setmeal(meal);
        });
        console.log(food);
      } catch (error) {
        console.log(error);
      }
    };
    getTodayData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated]);

  // Get the report of any day

  const getReportbyDate = async (dateString) => {
    try {
      const report = await axios.get(
        `https://mynutritionguide.herokuapp.com/api/v1/food/${dateString}`
      );
      // setReportdata(report.data[0]);
      // eslint-disable-next-line array-callback-return
      report.data.map((item) => {
        setitem(item);
      });
      // console.log(report.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // Empty the searched state

  const emptySearchedFood = () => {
    setSearchedfoods([]);
  };

  // provide the meal state to diferent component acc to their mealtime

  const findMealTime = (MealTime) => {
    switch (MealTime) {
      case "Breakfast":
        return Breakfast;
      case "Lunch":
        return Lunch;
      case "Snacks":
        return Sancks;
      case "Dinner":
        return Dinner;
      default:
        return "neutral";
    }
  };

  // For diferent mealImg

  const findMealTimeImg = (MealTime) => {
    switch (MealTime) {
      case "Breakfast":
        return BreakfastImg;
      case "Lunch":
        return LunchImg;
      case "Snacks":
        return SancksImg;
      case "Dinner":
        return DinnerImg;
      default:
        return "neutral";
    }
  };

  //  get the food data form API

  const searchFood = async (qurry) => {
    try {
      const data = await axios.get(
        `https://api.edamam.com/api/food-database/v2/parser?app_id=ce4bd46d&app_key=60eee620bd9035714e30b7ca0fd5a1b0&ingr=${qurry}&nutrition-type=cooking`
      );

      // const filterdata = await data.data.hints.filter((food) =>
      //   food.food.hasOwnProperty("image")
      // );

      setSearchedfoods(data.data.hints);
      console.log(data.data.hints);
    } catch (err) {
      console.log("error");
    }
  };

  return (
    <UserContext.Provider
      value={{
        Breakfast,
        Lunch,
        Sancks,
        Dinner,
        searchedfoods,
        todaydate,
        datestring,
        reportdata,
        breakfastitem,
        lunchitem,
        snacksitem,
        dinneritem,
        searchFood,
        addFood,
        findMealTime,
        findMealTimeImg,
        emptySearchedFood,
        getReportbyDate,
        prependZero,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
const useAppContext = () => {
  return useContext(UserContext);
};
export { AppProvider, UserContext, useAppContext };
