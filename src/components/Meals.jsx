import { useContext } from "react";
import { currencyFormatter } from "../utils/formatting"
import Button from "./UI/Button"
import CartContext from "../store/CartContext";

export default function Meals({ title, meals, isLoading, loadingText, fallbackText }) {
  const cartCtx = useContext(CartContext);

  function handleAddMealToCart(meal) {
    cartCtx.addItem(meal);
  }

  return (
      <>
          <h2 style={{textAlign: "center"}}>{title}</h2>
          {isLoading && <p style={{textAlign: "center"}}>{loadingText}</p>}
          {!isLoading && meals.length === 0 && <p className="fallback">{fallbackText}</p>}
          {!isLoading && meals.length > 0 && (
              <ul id="meals">
              {meals.map((meal) => (
                <li key={meal.id} className="meal-item">
                  <article>
                    <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
                    <div>
                      <h3>{meal.name}</h3>
                      <p className="meal-item-price">{meal.description}</p>
                      <p className="meal-item-description">{currencyFormatter.format(meal.price)}</p>
                    </div>
                    <p className="meal-item-actions">
                      <Button onClick={() => handleAddMealToCart(meal)}>Add to Cart</Button>
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          )}
      </>
  );
}