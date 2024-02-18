const getDate = () => {
  const currentDate = new Date();

  const month = currentDate
    .toLocaleString("default", { month: "short" })
    .toLowerCase();
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const date = `${month}-${day}-${year}`;

  return date;
};

export default getDate;
