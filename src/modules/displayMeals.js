import getMealDetails from './getMealDetails'; 

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

        const commentButton = document.createElement('button'); 
        commentButton.classList.add('comment-button');
        commentButton.textContent = 'Comment';
        commentButton.style.display = 'block'; 
        itemContainer.appendChild(itemImg); 
        itemContainer.appendChild(desc);
        itemContainer.appendChild(heartIcon);
        itemContainer.appendChild(commentButton); 

       
        commentButton.addEventListener('click', async () => {
            const mealDetails = await getMealDetails(item.idMeal); 
            openDetailsPopup(mealDetails); 
        });

        itemBox.appendChild(itemContainer);
    });
};

const openDetailsPopup = (mealDetails) => {

    const popup = document.createElement('div');
    popup.classList.add('popup'); 


    const closeButton = document.createElement('i');
    closeButton.classList.add('popup-close', 'fas', 'fa-times'); 
    
    closeButton.addEventListener('click', () => {
        document.body.removeChild(popup);
    });


    const mealInfo = document.createElement('div');
    mealInfo.innerHTML = `
        <h2>${mealDetails.strMeal}</h2>
        <img src="${mealDetails.strMealThumb}" alt="${mealDetails.strMeal}" class="popup-image">
        <p>${mealDetails.strInstructions}</p>
    `;

    popup.appendChild(closeButton); 
    popup.appendChild(mealInfo);

    document.body.appendChild(popup);
};

export default showMeals;
