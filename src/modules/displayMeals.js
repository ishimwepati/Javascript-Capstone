import getMealDetails from './getMealDetails'; 

const updateCommentCounter = (commentCount) => {
    const commentCounter = document.querySelector('.comment-counter');

    if (commentCounter) {
        commentCounter.textContent = `Comments: ${commentCount}`;
    }
};

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

    const commentForm = createCommentForm(mealId);
    popup.appendChild(mealInfo);
    popup.appendChild(commentForm);

    // Fetch existing comments from the API and display them
    try {
        const mealComments = await fetchCommentsForMeal(mealId);
        const commentsSection = createCommentsSection(mealComments);
        popup.appendChild(commentsSection); // Append the comments section if available
    } catch (error) {
        console.error('Error fetching comments:', error);
    }

    document.body.appendChild(popup);
};


const fetchCommentsForMeal = async (mealId) => {
    const apiUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/VT6MgkCI6GHRm8y0ZkMt/comments?item_id=${mealId}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            console.error('Error response:', response.status, await response.text());
            // Handle the error by returning an empty array
            return [];
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};


const createCommentsSection = (comments) => {
    const commentsSection = document.createElement('div');
    commentsSection.classList.add('comments-section');

    const commentCount = comments.length;

    const commentCounter = document.createElement('p');
    commentCounter.classList.add('comment-counter');
    commentCounter.textContent = `Comments: ${commentCount}`;

    commentsSection.appendChild(commentCounter);

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

    return commentsSection;
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

// ...

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


const updateCommentsSection = (newCommentsSection) => {
    const existingCommentsSection = document.querySelector('.comments-section');
    if (existingCommentsSection) {
        existingCommentsSection.replaceWith(newCommentsSection);
    }
};

export default showMeals;
