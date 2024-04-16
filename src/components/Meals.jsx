import MealItem from "./MealItem";
import Error from "./Error";
import useHTTP from "../hooks/useHTTP";

const config = {};

export default function Meals() {
  const {
    data: meals,
    error,
    isLoading
  } = useHTTP('https://order-food-app-3a2b8-default-rtdb.firebaseio.com/.json', config, []);

  if (isLoading) {
    return <p className="center">Meals are loading...</p>
  }

  if (error) {
    return <Error title='Failed to fetch meals' message={error}/>
  }

  return (
    <div id="meals">
      {meals.map((meal) => {
        return <MealItem key={meal.id} meal={meal} />
      }
    )}
    </div>
  );
}