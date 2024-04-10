import { useEffect, useState } from "react";
import MealItem from "./MealItem";

export default function Meals() {
  const[ meals, setMeals ] = useState([]);
  useEffect(() => {
    async function getMeals() {
      const response = await fetch('http://localhost:3000/meals');
      const resData = await response.json();

      if(!resData.ok) {

      }

      setMeals(resData);
    }

    getMeals();
  }, [])

  return (
    <div id="meals">
      {meals.map((meal) => {
        return <MealItem key={meal.id} meal={meal} />
      }
    )}
    </div>
  );
}