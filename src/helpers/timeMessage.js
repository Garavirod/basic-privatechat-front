import moment from 'moment';
export const hourMonthMoment  = (date) => {
    const formatMomentDate = moment( date );
    return formatMomentDate.format('HH:mm a | MMMM Do');
}