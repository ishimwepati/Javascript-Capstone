const commentsCounter = (commentCount) => {
  const commentCounter = document.querySelector('.comment-counter');

  if (commentCounter) {
    commentCounter.textContent = `Comments: ${commentCount}`;
  }
};

export default commentsCounter;