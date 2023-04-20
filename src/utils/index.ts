import moment from 'moment';

export const useDate = (serverDate: any) => {
   const messageDate = moment.unix(serverDate.seconds).format('DD.MM');
   const todayDate = moment(Date.now()).format('DD.MM');
   return messageDate === todayDate ? 'today' : messageDate;
};
