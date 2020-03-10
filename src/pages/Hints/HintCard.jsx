import React, {
    useEffect
} from "react"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';

function HintCard(props) {
    const {
        classes,
        data
    } = props
    const handleMore = function(link) {
        return function(){
            window.open(link)
        }
    }
    return (
        <Card className={classes.hcard}>
        <CardContent className={classes.hcardContent}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            {data.title}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
            {data.header}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
           {data.pos}
        </Typography>
        <Typography variant="body2" component="p">
            {data.content}
        </Typography>
        </CardContent>
        <CardActions>
            <Button onClick={handleMore(data.link)}>More</Button>
            {data.video?<Button onClick={handleMore(data.video)}>Video</Button>:null}
        </CardActions>
        
        </Card>
    )
}
export default HintCard
