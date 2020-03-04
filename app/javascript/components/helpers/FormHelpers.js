const getProcessedDishValues = (values) => {
    return {
        food: {
            name: values.dishName.trim(),
            price: parseFloat(values.price),
            dailyLimit: parseInt(values.dailyLimit)
        } 
    };
};

const getProcessedFoodCategory = (values) => {
    return {
        food_category: {
            name: values.categoryName.trim()
        }
    }
};

export { getProcessedDishValues, getProcessedFoodCategory };
