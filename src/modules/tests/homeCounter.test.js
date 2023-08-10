import homeCounter from '../homeCounter';

const mockAppendChild = jest.fn();
const mockGetElementById = jest.fn(() => ({
  appendChild: mockAppendChild,
}));

document.getElementById = mockGetElementById;

describe('homeCounter', () => {
  test('should append a counter span with the correct text', () => {
    const length = 10;
    homeCounter(length);

    expect(mockGetElementById).toHaveBeenCalledWith('home-icon');

    expect(mockAppendChild).toHaveBeenCalledWith(expect.any(HTMLSpanElement));

    const createdSpan = mockAppendChild.mock.calls[0][0];
    expect(createdSpan.textContent).toBe(`(${length})`);
  });
});
