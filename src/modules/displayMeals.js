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
const openDetailsPopup = async (mealDetails, mealId) => {
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

    // Fetch existing comments from the API and display them
    try {
        const mealComments = await fetchCommentsForMeal(mealId);
        
        // Create a comments section with comments and counter
        const commentsSection = createCommentsSection(mealComments);
        
        // Append the comments section to the popup
        popup.appendChild(commentsSection);
        
        document.body.appendChild(popup);
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
};



const fetchCommentsForMeal = async (mealId) => {
    const apiUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/VT6MgkCI6GHRm8y0ZkMt/comments?item_id=${mealId}`;
    console.log('API URL:', apiUrl);

    try {
        console.log('Fetching comments for meal ID:', mealId);
        const response = await fetch(apiUrl);

        if (!response.ok) {
            console.error('Error response:', response.status, await response.text());
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};

const createCommentsSection = (comments) => {
    const commentsContainer = document.createElement('div');
    commentsContainer.classList.add('comments-container');

    const commentsSection = document.createElement('div');
    commentsSection.classList.add('comments-section');

    const commentCount = comments.length;

    if (commentCount > 0) {
        const commentsList = document.createElement('ul');
        commentsList.classList.add('comments-list');

        comments.forEach(comment => {
            const commentItem = document.createElement('li');
            commentItem.innerHTML = `
                <span>${comment.username} (${comment.creation_date}):</span>
                <p>${comment.comment}</p>
            `;
            commentsList.appendChild(commentItem);
        });

        commentsSection.appendChild(commentsList);
    } else {
        const noCommentsMessage = document.createElement('p');
        noCommentsMessage.textContent = 'No comments yet.';
        commentsSection.appendChild(noCommentsMessage);
    }

    const commentCounter = document.createElement('p');
    commentCounter.textContent = `Comments: ${commentCount}`;
    commentsContainer.appendChild(commentsSection);
    commentsContainer.appendChild(commentCounter);

    return commentsContainer;
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

        const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/VT6MgkCI6GHRm8y0ZkMt/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentData)
        });

        if (!response.ok) {
            throw new Error('Error sending comment data');
        }

        const mealComments = await fetchCommentsForMeal(mealId);
        const commentsSection = createCommentsSection(mealComments);
        updateCommentsSection(commentsSection);

    } catch (error) {
        console.error('Error sending comment:', error);
    }
};



const updateCommentsSection = (newCommentsContainer) => {
    const existingCommentsContainer = document.querySelector('.comments-container');
    if (existingCommentsContainer) {
        existingCommentsContainer.parentNode.replaceChild(newCommentsContainer, existingCommentsContainer);
    }
};






export default showMeals;