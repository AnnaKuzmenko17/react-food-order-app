import { useContext } from "react";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import { currFormatter } from "../util/formatting";

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);
  console.log(meal, cartCtx.items);
  const existingIndex = cartCtx.items.findIndex((item) => item.id === meal.id);
  const isAddedToCart = existingIndex !== -1;
  const quantity = isAddedToCart ? cartCtx.items[existingIndex].quantity : 0;

  function handleAddMealToCart() {
    cartCtx.addItem(meal);
  }

  return (
    <li className="meal-item">
      <article>
        <img src={meal.image} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{currFormatter.format(meal.price)}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p>
          {isAddedToCart ?
            <p className="meal-item-actions">
              <button onClick={() => cartCtx.removeItem(meal.id)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => cartCtx.addItem(meal)}>+</button>
            </p>
            :
            <Button onClick={handleAddMealToCart}>Add to cart</Button>
          }
        </p>
      </article>
    </li>
  );
}