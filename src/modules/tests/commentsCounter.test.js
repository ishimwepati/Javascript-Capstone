import commentsCounter from '../commentsCounter';

describe('commentsCounter', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div class="comment-counter"></div>';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('updates the comment counter text content', () => {
    const commentCount = 5;

    commentsCounter(commentCount);

    const commentCounterElement = document.querySelector('.comment-counter');
    expect(commentCounterElement.textContent).toBe(`Comments: ${commentCount}`);
  });

  it('handles 0 items on the page', () => {
    commentsCounter(0);

    const commentCounterElement = document.querySelector('.comment-counter');
    expect(commentCounterElement.textContent).toBe('Comments: 0');
  });

  it('does not throw error when commentCounter is not found', () => {
    document.body.innerHTML = '';
    expect(() => {
      commentsCounter(10);
    }).not.toThrow();
  });
});
