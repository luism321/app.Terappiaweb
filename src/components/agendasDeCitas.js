import React from 'react';
import 'date-fns'
import Grip from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import {MuiPickersUtilsProvider,
KeyboardTimePicker,
KeyboardDatePicker
} from '@material-ui/pickers'

function Cita(){
    const [selectedDate,setSelectedDate]=React.useState(
        new Date()
    )
    const [selectedTime,setSelectedTime]=React.useState(
        new Date()
    )

const handleDateChange=(date)=>{
setSelectedDate(date)
setSelectedTime(date)
}

return(
<div className="">
<MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Grip container justify="space-around">
        <KeyboardDatePicker
        //disableToolbar
        format="MM/dd/yy"
        margin="normal"
        id="date-picker"
        label="date-picker"
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{'aria-label':'change date'}}
        />
        <KeyboardTimePicker
        margin="normal"
        id="timepicker"
        label="Time picker"
        value={selectedTime}
        onChange={handleDateChange}
        KeyboardButtonProps={{'aria-label':'change date'}}
        />
    </Grip>
</MuiPickersUtilsProvider>
</div>
);




}

export default Cita;