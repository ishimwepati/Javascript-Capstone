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

    // calling counter function
    commentsCounter(commentCount);

    const commentCounterElement = document.querySelector('.comment-counter');
    expect(commentCounterElement.textContent).toBe(`Comments: ${commentCount}`);
  });

  it('does not throw error when commentCounter is not found', () => {
    document.body.innerHTML = '';
    expect(() => {
      commentsCounter(10);
    }).not.toThrow();
  });
});
