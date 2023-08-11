const homeCounter = () => {
  const homeIcon = document.getElementById('home-icon');
  const displayedItems = document.querySelectorAll('.item');

  const counterSpan = document.createElement('span');
  counterSpan.textContent = `(${displayedItems.length})`;

  homeIcon.appendChild(counterSpan);
};

export default homeCounter;
