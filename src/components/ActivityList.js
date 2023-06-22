import { useHistory } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

export default function ActivityList(props) {
    const { activities, setActivities, setEditActivity } = props;
    const history = useHistory();

    const handleEdit = (id) => {
        const item = activities.find(activity => activity.id === id);
        if (!item) return;
        setEditActivity(item);
        history.push("/create");
    }

    const handleDelete = (id) => {
        const filteredActivities = activities.filter(activity => activity.id !== id);
        setActivities(filteredActivities);
    }
    
    return (
        <Container>
            <List>
                {activities.map(activity => (
                <ListItem 
                    key={activity.id}
                >
                    <Grid container>
                        <Grid item sm={12} md={8}>
                            <ListItemText
                                primary={activity.type}
                                secondary={
                                <>
                                    <Typography
                                    variant="body2"
                                    >
                                    Time: {activity.time}
                                    </Typography>
                                    <Typography
                                    variant="body2"
                                    >
                                    Performer: {activity.performer}
                                    </Typography>
                                    <Typography
                                    variant="body2"
                                    >
                                    Pitch: {activity.pitch}
                                    </Typography>
                                </>
                                }
                            >
                            </ListItemText>
                        </Grid>
                    <Grid item sm={12} md={4} container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid item xs={3}>
                        <Button variant="contained" sx={{ mr: 1 }} onClick={() => handleEdit(activity.id)}>Edit</Button>
                        <Button variant="outlined"  color="error" onClick={() => handleDelete(activity.id)}>Delete</Button>
                        </Grid>
                    </Grid>
                    </Grid>
                </ListItem>
                ))}
            </List>
        </Container>
    )
}