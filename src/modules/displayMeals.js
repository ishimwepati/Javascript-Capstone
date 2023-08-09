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
            openDetailsPopup(mealDetails, item.idMeal); // Pass mealId here
        });
        
        itemBox.appendChild(itemContainer);
    });
};

const openDetailsPopup = (mealDetails, mealId) => {
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

    const commentForm = createCommentForm(mealId);
    popup.appendChild(commentForm);

    document.body.appendChild(popup);
};


const createCommentForm = (mealId) => {

    const form = document.createElement('form');
    form.classList.add('comment-form');

    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Your Name:';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'user-name';
    nameInput.required = true;

    const commentLabel = document.createElement('label');
    commentLabel.textContent = 'Your Comment:';
    const commentInput = document.createElement('textarea');
    commentInput.name = 'user-comment';
    commentInput.required = true;

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Leave a Comment';

    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(commentLabel);
    form.appendChild(commentInput);
    form.appendChild(submitButton);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const userName = nameInput.value;
        const userComment = commentInput.value;
        handleCommentSubmit(userName, userComment, mealId); // Pass mealId here
        form.reset();
    });

    return form;
};



const handleCommentSubmit = async (userName, userComment, mealId) => {
    try {
        const commentData = {
            item_id: mealId,
            username: userName,
            comment: userComment
        };

        const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/tQwE3IU59z3JaJmDVQ7q/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentData)
        });

        if (!response.ok) {
            throw new Error('Error sending comment data');
        }

        // Handle successful response here if needed

    } catch (error) {
        console.error('Error sending comment:', error);
    }
};


export default showMeals;
