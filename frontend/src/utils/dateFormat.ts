import moment from "moment";

export const dateFormat = (date: Date | null) => {
  return moment(date).format("DD/MM/YYYY");
};
