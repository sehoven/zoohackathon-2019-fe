import 'date-fns';
import React from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export interface DateRangeInputProps {
    setStart: any;
    setEnd: any;
};

// TODO: type definitions
const DateRangeInput = (props: DateRangeInputProps) => {
    const [selectedStartDate, setSelectedStartDate] = React.useState<Date | null>(new Date());
    const [selectedEndDate, setSelectedEndDate] = React.useState<Date | null>(new Date());
    
    const handleStartDateChange = (date: Date | null) => {
        setSelectedStartDate(date);
        // @ts-ignore
        props.setStart(date.getTime()/1000);
        if ((date != null) && ((selectedEndDate == null) || (selectedEndDate <= date))) {
            setSelectedEndDate(date);
            props.setEnd(date.getTime()/1000);
        }
    };

    const handleEndDateChange = (date: Date | null) => {
        setSelectedEndDate(date);
        // @ts-ignore
        props.setEnd(date.getTime()/1000);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Start date"
                value={selectedStartDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="End date"
                minDate={selectedStartDate}
                minDateMessage="The end date must be after the start date"
                value={selectedEndDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>
    )
}

export default DateRangeInput;