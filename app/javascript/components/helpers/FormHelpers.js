const getProcessedDishValues = (values) => {
    return {
        food: {
            name: values.dishName.trim(),
            price: parseFloat(values.price),
            daily_limit: parseInt(values.dailyLimit),
            ms_url_id: values.menuSection.url_id
        } 
    };
};

const getProcessedMenuSection = (values) => {
    return {
        menu_section: {
            name: values.sectionName.trim()
        }
    }
};

const getProcessedPromotion = (values) => {
    return {
        promotion : {
            p_name: values.promoName,
            promocode: values.promocode,
            percentage: values.percentage,
            max_redeem: values.maxRedeem,
            start_datetime: values.startDateTime.format(),
            end_datetime: values.endDateTime.format()
        }
    }
}


const getErrorMessage = (error) => {
    if (error.response != undefined) {
        return error.response.data.errors;
    } else {
        return error.message;
    }
}

export { getProcessedDishValues, getProcessedMenuSection, getProcessedPromotion, getErrorMessage };
