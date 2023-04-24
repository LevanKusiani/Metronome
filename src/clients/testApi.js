const useTestApi = () => {
    const getSomething = () => {
        return fetch("https://jsonplaceholder.typicode.com/todos/")
            .then(response => response.json())
            .then(data => data);
    }

    return { getSomething };
};

export default useTestApi;