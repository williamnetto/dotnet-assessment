  import moment from "moment";

  export const calculateTimeInCompany = (hireDate: string): string => {
    const now = moment();
    const hire = moment(hireDate);
    const duration = moment.duration(now.diff(hire));

    return `${duration.years()}y – ${duration.months()}m – ${duration.days()}d`;
  };