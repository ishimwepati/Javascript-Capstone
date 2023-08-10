const getMeals = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default getMeals;
