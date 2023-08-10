import homeCounter from '../homeCounter';

const mockAppendChild = jest.fn();
const mockQuerySelectorAll = jest.fn(() => []);

const mockGetElementById = jest.fn(() => ({
  appendChild: mockAppendChild,
}));

document.getElementById = mockGetElementById;
document.querySelectorAll = mockQuerySelectorAll;

describe('homeCounter', () => {
  test('should append a counter span with the correct text', () => {
    // Mock the number of displayed items
    const displayedItemsCount = 10;
    mockQuerySelectorAll.mockReturnValueOnce(new Array(displayedItemsCount));

    homeCounter();

    expect(mockGetElementById).toHaveBeenCalledWith('home-icon');

    expect(mockAppendChild).toHaveBeenCalledWith(expect.any(HTMLSpanElement));

    const createdSpan = mockAppendChild.mock.calls[0][0];
    expect(createdSpan.textContent).toBe(`(${displayedItemsCount})`);
  });
});
