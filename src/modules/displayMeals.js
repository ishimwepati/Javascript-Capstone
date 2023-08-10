import getMealDetails from './getMealDetails';
import addLike from './addLikes';
import getLikes from './getLikes';

const appId = 'tQwE3IU59z3JaJmDVQ7q';

const updateCommentCounter = (commentCount) => {
  const commentCounter = document.querySelector('.comment-counter');

  if (commentCounter) {
    commentCounter.textContent = `Comments: ${commentCount}`;
  }
};

const createCommentsSection = (comments) => {
  const commentsSection = document.createElement('div');
  commentsSection.classList.add('comments-section');

  const commentCount = comments.length;

  if (commentCount > 0) {
    const commentsList = document.createElement('ul');
    commentsList.classList.add('comments-list');

    const reversedComments = comments.slice().reverse();

    const commentCounter = document.createElement('p');
    commentCounter.classList.add('comment-counter');
    commentCounter.textContent = `Number of Comments : ${commentCount}`;

    commentsSection.appendChild(commentCounter);

    updateCommentCounter(commentCount);

    reversedComments.forEach((comment) => {
      const commentItem = document.createElement('li');
      commentItem.classList.add('comment');

      const commentContainer = document.createElement('div');
      commentContainer.classList.add('comment-container');

      const commentMeta = document.createElement('div');
      commentMeta.classList.add('comment-meta');

      const commentAuthor = document.createElement('span');
      commentAuthor.classList.add('comment-author');
      commentAuthor.textContent = ` by ${comment.username}`;

      const commentDateTime = document.createElement('span');
      commentDateTime.classList.add('comment-datetime');
      commentDateTime.textContent = `${comment.creation_date}`;

      commentMeta.appendChild(commentDateTime);
      commentMeta.appendChild(commentAuthor);

      const commentText = document.createElement('span');
      commentText.classList.add('comment-text');
      commentText.textContent = comment.comment;

      commentContainer.appendChild(commentMeta);
      commentContainer.appendChild(commentText);

      commentItem.appendChild(commentContainer);

      commentsList.appendChild(commentItem);
    });

    commentsSection.appendChild(commentsList);
  } else {
    const noCommentsMessage = document.createElement('p');
    noCommentsMessage.textContent = 'Be the first one Leave a Comment';
    commentsSection.appendChild(noCommentsMessage);
  }

  return commentsSection;
};

const updateCommentsSection = (newCommentsSection) => {
  const existingCommentsSection = document.querySelector('.comments-section');
  if (existingCommentsSection) {
    existingCommentsSection.replaceWith(newCommentsSection);
  }
};

const fetchCommentsForMeal = async (mealId) => {
  const apiUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/VT6MgkCI6GHRm8y0ZkMt/comments?item_id=${mealId}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.error('Error response:', response.status, await response.text());

      return [];
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};
const handleCommentSubmit = async (userName, userComment, mealId) => {
  try {
    const commentData = {
      item_id: mealId,
      username: userName,
      comment: userComment,
    };

    const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/VT6MgkCI6GHRm8y0ZkMt/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
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
const createCommentForm = (mealId) => {
  const form = document.createElement('form');
  form.classList.add('comment-form');

  const nameLabel = document.createElement('label');
  nameLabel.textContent = '';
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.name = 'user-name';
  nameInput.placeholder = 'Enter your name';
  nameInput.required = true;

  const commentLabel = document.createElement('label');
  commentLabel.textContent = '';
  const commentInput = document.createElement('textarea');
  commentInput.name = 'user-comment';
  commentInput.placeholder = 'Enter your Comment';
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
    handleCommentSubmit(userName, userComment, mealId);
    form.reset();
  });

  return form;
};
const openDetailsPopup = async (mealDetails, mealId) => {
  const popup = document.createElement('div');
  popup.classList.add('popup');

  const closeButton = document.createElement('i');
  closeButton.classList.add('popup-close', 'fas', 'fa-times');

  closeButton.addEventListener('click', () => {
    document.body.removeChild(popup);
  });

  const closeContainer = document.createElement('div');
  closeContainer.classList.add('close-container');
  closeContainer.appendChild(closeButton);

  const mealInfo = document.createElement('div');
  mealInfo.innerHTML = `
        <h2>${mealDetails.strMeal}</h2>
        <img src="${mealDetails.strMealThumb}" alt="${mealDetails.strMeal}" class="popup-image">
        <p>${mealDetails.strInstructions}</p>
    `;

  try {
    const mealComments = await fetchCommentsForMeal(mealId);
    const commentsSection = createCommentsSection(mealComments);
    popup.appendChild(mealInfo);
    popup.appendChild(commentsSection); // Move this line before the commentForm

    const commentForm = createCommentForm(mealId);
    popup.appendChild(commentForm); // Append the comment form after the commentsSection
  } catch (error) {
    console.error('Error fetching comments:', error);
  }

  closeContainer.appendChild(closeButton);
  popup.appendChild(closeContainer);

  document.body.appendChild(popup);
};

const showMeals = async (data) => {
  const itemBox = document.getElementById('items-box');
  const likesData = await getLikes();

  data.meals.forEach((item) => {
    const itemContainer = document.createElement('div');

    const itemImg = document.createElement('img');
    itemImg.alt = 'seafood-image';
    itemImg.classList.add('item-images');
    itemImg.src = item.strMealThumb;

    const desc = document.createElement('p');
    desc.classList.add('item-p');
    desc.textContent = item.strMeal;

    const heartIcon = document.createElement('i');
    heartIcon.classList.add('far', 'fa-heart', 'heart-icon', 'custom-heart-class');
    heartIcon.dataset.itemId = item.idMeal;

    const likesElement = document.createElement('p');
    likesElement.classList.add('likes-count');
    const matchingLike = likesData.find((like) => like.item_id === item.idMeal);
    const likesCount = matchingLike ? matchingLike.likes : 0;
    likesElement.textContent = `Likes: ${likesCount}`;

    heartIcon.addEventListener('click', async () => {
      try {
        await addLike(appId, item.idMeal);
        if (matchingLike) {
          matchingLike.likes += 1;
        } else {
          likesData.push({ itemId: item.idMeal, likes: 1 });
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
      openDetailsPopup(mealDetails, item.idMeal);
    });

    itemBox.appendChild(itemContainer);
  });
};

export { showMeals, updateCommentCounter };
