const getLikes = async () => {
    try {
        const response = await fetch("https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/tQwE3IU59z3JaJmDVQ7q/likes");

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export default getLikes;

