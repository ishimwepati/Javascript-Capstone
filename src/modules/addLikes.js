const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';

const addLike = async (appId, itemId) => {
  try {
    const response = await fetch(`${baseUrl}/apps/${appId}/likes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item_id: itemId,
      }),
    });

    if (response.status === 201) {
      console.log('Like added successfully.');
    } else {
      const responseBody = await response.text();
      console.log('Failed to add like. Server response:', responseBody);
    }
  } catch (error) {
    console.error('Error adding like:', error);
  }
};

export default addLike;
