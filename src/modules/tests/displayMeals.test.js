import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/dom';
import { updateCommentCounter } from '../displayMeals'; 

describe('updateCommentCounter function', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div class="comment-counter"></div>';
  });

  test('updates comment counter correctly', () => {
    updateCommentCounter(5);

    const commentCounterElement = screen.getByText('Comments: 5');
    expect(commentCounterElement).toBeInTheDocument();
  });

  test('does not update comment counter if element is not found', () => {
    document.body.innerHTML = '';

    updateCommentCounter(10);

    const commentCounterElement = screen.queryByText('Comments: 10');
    expect(commentCounterElement).toBeNull();
  });
});
