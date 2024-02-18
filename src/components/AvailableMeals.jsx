import useHttp from "../hooks/useHttp";
import Error from "./Error";
import Meals from "./Meals";

const requestConfig = {};

export default function AvailableMeals() {
    const {
        data: availableMeals, 
        isLoading, 
        error 
    } = useHttp('http://localhost:3000/meals', requestConfig, []);

    if(error){
        return <Error title="Failed to fetch meals" message={error} />;
    }

    return (
        <Meals 
            title = "Available Meals"
            meals = {availableMeals}
            isLoading = {isLoading}
            loadingText = "Fetching Meals...."
            fallbackText = "No meals available"
        />
    ); 
}