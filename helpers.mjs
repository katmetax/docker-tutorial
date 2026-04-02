const connectToDatabase = () => {
    const dummyPromise = new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    })

    return dummyPromise;
}

export default connectToDatabase;
