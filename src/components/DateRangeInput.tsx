import 'date-fns';
import React from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const DateRangeInput = () => {
    const [selectedStartDate, setSelectedStartDate] = React.useState<Date | null>(new Date());
    const [selectedEndDate, setSelectedEndDate] = React.useState<Date | null>(new Date());
    
    const handleStartDateChange = (date: Date | null) => {
        setSelectedStartDate(date);
        if ((date != null) && ((selectedEndDate == null) || (selectedEndDate <= date))) {
            setSelectedEndDate(date);
        }
    };

    const handleEndDateChange = (date: Date | null) => {
        setSelectedEndDate(date);
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
                fullWidth
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
                fullWidth
            />
        </MuiPickersUtilsProvider>
    )
}

export default DateRangeInput;