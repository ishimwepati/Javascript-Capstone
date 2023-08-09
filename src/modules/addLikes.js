const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';

const addLike = async (app_id, item_id) => {
    try {
        const response = await fetch(`${baseUrl}/apps/${app_id}/likes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                item_id: item_id
            })
        });

        if (response.status === 201) {
            console.log('Like added successfully.');
        } else {
            console.log('Failed to add like.');
        }
    } catch (error) {
        console.error('Error adding like:', error);
    }
};

export default addLike;