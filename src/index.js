import './style.css';
import './comment.css';
import showMeals from './modules/displayMeals';
import getMeals from './modules/getMeals';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const mealsData = await getMeals();
        showMeals(mealsData);
    } catch (error) {
        console.error('Error getting meals:', error);
    }
});
