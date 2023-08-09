import getMealDetails from './getMealDetails'; 
import addLike from "./addLikes";
import getLikes from "./getLikes";
const app_id = 'tQwE3IU59z3JaJmDVQ7q';

const showMeals = async (data) => {
    const itemBox = document.getElementById('items-box');
    const likesData = await getLikes();

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
        heartIcon.dataset.itemId = item.idMeal;

        const likesElement = document.createElement('p');
        const matchingLike = likesData.find(like => like.item_id === item.idMeal);
        const likesCount = matchingLike ? matchingLike.likes : 0;
        likesElement.textContent = `Likes: ${likesCount}`;

        heartIcon.addEventListener('click', async () => {
            try {
                await addLike(app_id, item.idMeal);
                if (matchingLike) {
                    matchingLike.likes++;
                } else {
                    likesData.push({ item_id: item.idMeal, likes: 1 });
                }
                likesElement.textContent = `Likes: ${matchingLike ? matchingLike.likes : likesCount + 1}`;
            } catch (error) {
                console.error('Error:', error);
            }
        });


        const commentButton = document.createElement('button'); 
        commentButton.classList.add('comment-button');
        commentButton.textContent = 'Comment';
        commentButton.style.display = 'block'; 
        itemContainer.appendChild(itemImg); 
        itemContainer.appendChild(desc);
        itemContainer.appendChild(heartIcon);
        itemContainer.appendChild(likesElement);
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
