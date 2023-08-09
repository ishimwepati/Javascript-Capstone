const homeCounter = (length) => {
    const homeIcon = document.getElementById('home-icon');

    const counterSpan = document.createElement('span');
    counterSpan.textContent = `(${length})`;

    homeIcon.appendChild(counterSpan);
}

export default homeCounter;