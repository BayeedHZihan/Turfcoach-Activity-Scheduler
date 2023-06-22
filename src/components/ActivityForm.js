import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { useHistory } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';


const activityOptions = ["Mowing", "Fertilisation", "Irrigation", "Aeration"];
const performerOptions = ["John", "Tom", "Tony"];
const pitchOptions = ["Pitch 1", "Pitch 2", "Pitch 3"];

function ActivityForm(prop) {
    const { activities, setActivities, editActivity } = prop;
    const history = useHistory();
    const [datetime, setDatetime] = useState(null);
    const [activity, setActivity] = useState("");
    const [performer, setPerformer] = useState("");
    const [pitch, setPitch] = useState("");

    useEffect(() => {
        if(editActivity) {
            const { type, time, performer, pitch } = editActivity;
            setActivity(type);
            setDatetime(dayjs(time));
            setPerformer(performer);
            setPitch(pitch);
        }
    }, []);

    const isIncompleteForm = () => !datetime || !activity || !performer || !pitch;

    const handleSave = () => {
        if (isIncompleteForm()) {
            alert('Please fill out the form');
            return;
        }
        editActivity ? editItem() : createNew();
        clearForm();
        history.push("/");
    }

    const editItem = () => {
        const updatedActivities = activities.map(currentActivity => {
            if (currentActivity.id === editActivity.id) {
                currentActivity.type = activity;
                currentActivity.time = datetime.$d.toString();
                currentActivity.performer = performer;
                currentActivity.pitch = pitch;
            }
            return currentActivity;
        });
        setActivities(updatedActivities);
    }

    const createNew = () => {
        const obj = {
            id: uuid().slice(0,8), 
            type: activity,
            time: datetime.$d.toString(),
            performer: performer,
            pitch: pitch
        };
        setActivities([...activities, obj]);
    }

    const clearForm = () => {
        setActivity("");
        setPerformer("");
        setPitch("");
        setDatetime(null);
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh' }}
            >
            <Grid item xs={3}>
                <FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker 
                                label="Date time" 
                                value={datetime}
                                onChange={(newValue) => {setDatetime(newValue); console.log(newValue)}}
                                sx={{ m: 2 }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <Autocomplete
                        disablePortal
                        options={activityOptions}
                        renderInput={(params) => <TextField {...params} label="Activity" fullWidth />}
                        value={activity}
                        onChange={(event, newValue) => setActivity(newValue)}
                        sx={{ m: 2 }}
                    />
                    <Autocomplete
                        disablePortal
                        options={performerOptions}
                        renderInput={(params) => <TextField {...params} label="Performer" />}
                        value={performer}
                        onChange={(event, newValue) => setPerformer(newValue)}
                        sx={{ m: 2 }}
                    />
                    <Autocomplete
                        disablePortal
                        options={pitchOptions}
                        renderInput={(params) => <TextField {...params} label="Pitch" />}
                        value={pitch}
                        onChange={(event, newValue) => setPitch(newValue)}
                        sx={{ m: 2 }}
                    />
                    <Button variant="contained" onClick={handleSave}>Save</Button>
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default ActivityForm;