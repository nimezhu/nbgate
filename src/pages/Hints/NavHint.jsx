import React, {
    useEffect
} from "react"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';

function NavCard(props) {
    const {
        classes
    } = props
    return (
        <Card className={classes.gcard}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            How to navigate chromosomes
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
        </CardContent>
        <CardActions>
        </CardActions>
        </Card>
    )
}
export default NavCard
