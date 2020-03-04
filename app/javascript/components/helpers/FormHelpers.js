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

const getErrorMessage = (error) => {
    if (error.response != undefined) {
        return error.response.data.errors;
    } else {
        return error.message;
    }
}

export { getProcessedDishValues, getProcessedFoodCategory, getErrorMessage };
