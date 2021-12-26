import DataLayer from "src/datalayer";


export default class Format {
    //-------------------------------------------------------------------------------------------------------
    static dateRangeForStepper(date_start: Date, date_end: Date): string {
        if (date_start == null && date_end == null) return "(All Dates)";
        let res = "( ";
        res += date_start ? Format.date(date_start) : "?";
        res += " - "
        res += date_end ? Format.date(date_end) : "?";
        return res + ")";
    }


    //-------------------------------------------------------------------------------------------------------
    static date(d: Date) {
        //get the month
        var m = d.getMonth();
        //get the day
        //convert day to string
        var day = d.getDate().toString();
        //get the year
        let y = d.getFullYear();

        //pull the last two digits of the year
        const year = y.toString().substr(-2);

        //increment month by 1 since it is 0 indexed
        //converts month to a string
        let month = (m + 1).toString();

        //if month is 1-9 pad right with a 0 for two digits
        if (month.length === 1) {
            month = "0" + month;
        }

        //if day is between 1-9 pad right with a 0 for two digits
        if (day.length === 1) {
            day = "0" + day;
        }

        //return the string "MMddyy"
        return month + "/" + day + "/" + year;
        // return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    }
}