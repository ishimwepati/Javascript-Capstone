const homeCounter = () => {
  const homeIcon = document.getElementById('home-icon');
  const displayedItems = document.querySelectorAll('.item'); // Adjust the selector to match your actual HTML structure

  const counterSpan = document.createElement('span');
  counterSpan.textContent = `(${displayedItems.length})`

  homeIcon.appendChild(counterSpan)
};

export default homeCounter;
