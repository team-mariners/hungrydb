const getProcessedDishValues = (values) => {
    return {
        food: {
            name: values.dishName.trim(),
            price: parseFloat(values.price),
            dailyLimit: parseInt(values.dailyLimit)
        } 
    };
};

export { getProcessedDishValues };
