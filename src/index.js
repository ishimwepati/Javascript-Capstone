import './style.css';
import './comment.css';
import {showMeals} from './modules/displayMeals';
import getMeals from './modules/getMeals';
import homeCounter from './modules/homeCounter';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const mealsData = await getMeals();
        const mealsLength = mealsData.meals.length
        showMeals(mealsData);
        homeCounter(mealsLength);
    } catch (error) {
        console.error('Error getting meals:', error);
    }
});
