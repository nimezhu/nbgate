import React, {
    useEffect,
    useState
} from "react"
import ReactDOM from 'react-dom';
import {
    withStyles
} from "@material-ui/styles";
import styles from "../styles"


import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AppCard from "../module/AppCard"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"


import IconButton from "@material-ui/core/IconButton"
import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import OpenInNewIcon from "@material-ui/icons/OpenInNew"

  
function Index(props) {
    const {
        classes,
        version
    } = props
    const [data, setData] = useState([])
    const sheetId = props.sheetid || "1N_viSL6hDY_n75dVP4bfiLJ99SOPzIfqrka1JvJjv4E"
    const title = props.title || "Publish"

    const  handleClick = function(d) {
        return function() {
            var location = "/v1/main.html?config=gsheet:" + sheetId + ":" + d.label.replace(" ", "%20")
            window.location.href = location
        }
    }
    const  handleOpen = function(d) {
        return function() {
            var location = "/v1/main.html?config=gsheet:" + sheetId + ":" + d.label.replace(" ", "%20")
            window.open(location)
        }
    }
  

    useEffect(() => {
        var sheetId = props.sheetid || "1N_viSL6hDY_n75dVP4bfiLJ99SOPzIfqrka1JvJjv4E"
        var title = props.title || "Publish"
        var self = this;
        var apiKey = "AIzaSyBhECk4C1LpxI1mDJjSTwot-hRP2v3bwEA"
        fetch("https://sheets.googleapis.com/v4/spreadsheets/" +
            sheetId + "/values/" + title + "!A:C?key=" + apiKey).then(function(d) {
            return d.json()
        }).then(function(d) {

            var t = d.values.map(function(d,i) {
                return {
                    label: d[0],
                    note: d[1],
                    i: i
                }
            })
            setData(t)
        }).catch(function(e) {
            setData([])
        })



    }, [])
    return (<div>
    <Box 
        display="flex"
        flexWrap="wrap"
    >
        {data.map(function(d,i){
            return (<Card className={classes.gcard}>
                <CardHeader
                    title = {d.label}
                >
                </CardHeader>
                 <CardMedia
        className={classes.gmedia}
        image={"/static/image/sessions/"+d.label+".png"}
        title={d.label}
      />
                <CardContent>
                     <Typography variant="body2" color="textSecondary" component="p">
                    {d.note}
                     </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="open" size="small" onClick={handleClick(d)}>
                        <PlayArrowIcon/>
                    </IconButton>
                     <IconButton aria-label="open" size="small" onClick={handleOpen(d)}>
                        <OpenInNewIcon/>
                    </IconButton>
                </CardActions>
            </Card>)
        })}

        <Card className={classes.gcard}>
            <CardHeader
                title="ORM"
            >
            </CardHeader>
            <CardMedia className={classes.gmedia}
                    image={"/static/image/sessions/ORM.png"}
                    title="ORM"
            />
                <CardContent>
                     <Typography variant="body2" color="textSecondary" component="p">
                    ORM data track.
                     </Typography>
                </CardContent>
                <CardActions disableSpacing>
                     <IconButton aria-label="open" size="small" onClick={function(){window.open("http://orm.nucleome.org")}}>
                        <OpenInNewIcon/>
                    </IconButton>
                </CardActions>
        </Card>
    </Box>
        </div>);
}

const Gallery = withStyles(styles)(Index);

export default Gallery
