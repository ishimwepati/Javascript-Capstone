import getMealDetails from './getMealDetails'; // Import your function to fetch meal details

const showMeals = (data) => {
    const itemBox = document.getElementById('items-box');

    data.meals.forEach(item => {
        const itemContainer = document.createElement('div'); 

        const itemImg = document.createElement('img');
        itemImg.alt = 'seafood-image';
        itemImg.classList.add('item-images');
        itemImg.src = item.strMealThumb;

        const desc = document.createElement('p');
        desc.classList.add('item-p');
        desc.textContent = item.strMeal;

        const heartIcon = document.createElement('i');
        heartIcon.classList.add('far', 'fa-heart', 'heart-icon');

        const commentButton = document.createElement('button'); // Creating the See More button
        commentButton.classList.add('comment-button');
        commentButton.textContent = 'See More';
        commentButton.style.display = 'block'; // Set the display property

        itemContainer.appendChild(itemImg); 
        itemContainer.appendChild(desc);
        itemContainer.appendChild(heartIcon);
        itemContainer.appendChild(commentButton); // Appending the See More button

        // Add click event listener to the See More button
        commentButton.addEventListener('click', async () => {
            const mealDetails = await getMealDetails(item.idMeal); // Fetch full meal details
            openDetailsPopup(mealDetails); // Open the details popup
        });

        itemBox.appendChild(itemContainer);
    });
};

// Open the details popup and display meal details
const openDetailsPopup = (mealDetails) => {
    // Create and style a modal/pop-up element
    const popup = document.createElement('div');
    popup.classList.add('popup'); // Style this class using CSS

    // Create a close button element
    const closeButton = document.createElement('button');
    closeButton.classList.add('popup-close');
    closeButton.textContent = 'X';
    
    // Add event listener to close the popup when the close button is clicked
    closeButton.addEventListener('click', () => {
        document.body.removeChild(popup);
    });

    // Create content for the popup (meal details)
    const mealInfo = document.createElement('div');
    mealInfo.innerHTML = `
        <h2>${mealDetails.strMeal}</h2>
        <img src="${mealDetails.strMealThumb}" alt="${mealDetails.strMeal}" class="popup-image">
        <p>${mealDetails.strInstructions}</p>
    `;
   

    // Append content to the popup
    popup.appendChild(closeButton); // Add the close button
    popup.appendChild(mealInfo);
  

    // Append the popup to the DOM
    document.body.appendChild(popup);
};

export default showMeals;
