import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

export default function Navbar(props) {
    const { setEditActivity } = props; 
    const history = useHistory();
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => history.push("/")}
                    >
                        <SportsSoccerIcon />
                    </IconButton>
                    
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{textAlign: 'left'}}>
                            <Link 
                                to="/" 
                                style={{ textDecoration: 'none', color: 'white' }}
                            >
                                turfcoach
                            </Link>
                        </Typography>
                    
                    
                        <Button color="inherit" onClick={() => setEditActivity(null)}>
                            <Link 
                                to="/create" 
                                style={{ textDecoration: 'none', color: 'white' }}>
                                    New Activity
                            </Link>
                        </Button>
                    
                </Toolbar>
            </AppBar>
        </Box>
    )
}