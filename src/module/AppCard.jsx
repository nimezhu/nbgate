import React, {
    useEffect
} from "react"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';

function AppCard(props) {
    const {
        data
    } = props
    const handleOpen = function() {
        window.open(data.url,"","width=1000,height=650")
    }
    useEffect(function() {
    }, [])
    return (
         <Box m={1}>
        <Card style={{"width":"300px"}}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {data.id}
          </Typography>
          <Typography component="div">
        </Typography>
        </CardContent>
        <CardActions>
        <Button variant="outlined" size="small" color="primary" onClick={handleOpen}>
            Open
        </Button>
        </CardActions>
        </Card>
         </Box>
    )
}
export default AppCard
