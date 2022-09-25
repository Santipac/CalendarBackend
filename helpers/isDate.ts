import moment from 'moment';
export const isDate = (value: Date) => {
  if (!value) {
    return false;
  }
  const fecha = moment(value);
  if (fecha.isValid()) {
    return true;
  } else {
    return false;
  }
};
