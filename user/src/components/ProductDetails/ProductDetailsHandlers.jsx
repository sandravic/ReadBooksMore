export const calculateEndDate = (startDate, rentalPeriod) => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + rentalPeriod);
    return endDate.toISOString().split('T')[0];
  };