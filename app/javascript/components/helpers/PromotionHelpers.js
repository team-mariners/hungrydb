import moment from 'moment-timezone';

export const momentisePromotionDateTime = (promotion) => {
    promotion.start_datetime = moment.parseZone(promotion.start_datetime);
    promotion.end_datetime = moment.parseZone(promotion.end_datetime);
};

export const isOngoing = (promotion, dateTime) => {    
    let now = !dateTime ? moment() : dateTime;
    return promotion.start_datetime.isSameOrBefore(now) && promotion.end_datetime.isAfter(now);
};

export const isScheduled = (promotion, dateTime) => {
    let now = !dateTime ? moment() : dateTime;
    return promotion.start_datetime.isAfter(now);
};

export const isClosed = (promotion, dateTime) => {
    let now = !dateTime ? moment() : dateTime;
    return promotion.end_datetime.isBefore(now);
};
