const getMealDetails = async (mealId) => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.meals[0]; // Assuming the API returns an array of meals
    } catch (error) {
        console.error('Error fetching meal details:', error);
        throw error;
    }
};

export default getMealDetails;
