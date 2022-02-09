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
import Grid from "@material-ui/core/Grid"
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
    const title = props.title || "Gallery"

    const handleClick = function(d) {
        var c = "/~yangz6/Nucleome_Browser/NB_session/example/" + d.label.replace(" ", "%20") + ".json"
        var location = "/v1/main.html?config=" + c
        return function() {
            //var location = "/v1/main.html?config=gsheet:" + sheetId + ":" + d.label.replace(" ", "%20")
            //var location = "/v1/main.html?config=/~yangz2/d.label.replace(" ", "%20")
            window.location.href = location
        }
    }
    const handleOpen = function(d) {
        var c = "/~yangz6/Nucleome_Browser/NB_session/example/" + d.label.replace(" ", "%20") + ".json"
        var location = "/v1/main.html?config=" + c
        return function() {
            //var location = "/v1/main.html?config=gsheet:" + sheetId + ":" + d.label.replace(" ", "%20")
            window.open(location)
        }
    }


    useEffect(() => {
        //var sheetId = props.sheetid || "1N_viSL6hDY_n75dVP4bfiLJ99SOPzIfqrka1JvJjv4E"
        //var title = props.title || "Gallery"
        var sheetId = props.sheetid || "1lKJX7XGK-hOOfX-DsdbJUG9QTM7It6L8asINFFZ0aPs"
        var title = props.title || "Examples"
        var self = this;
        var apiKey = "AIzaSyBhECk4C1LpxI1mDJjSTwot-hRP2v3bwEA"
        var cors = "https://vis.nucleome.com/cors/"
        var url = "https://sheets.googleapis.com/v4/spreadsheets/" + sheetId + "/values/" + title + "!A:C?key=" + apiKey
        fetch(url).then(function(d) {
                return d.json()
            })
            .then(function(d) {
                var t = d.values.map(function(d, i) {
                    return {
                        label: d[0],
                        title: d[1],
                        note: d[2],
                        i: i
                    }
                })
                t.shift()
                setData(t)
            }).catch(function(e) {
                fetch(cors + url,{headers:{Origin:"https://vis.nucleome.org"}}).then((d) => (d.json()))
                    .then((d) => {
                        var t = d.values.map(function(d, i) {
                            return {
                                label: d[0],
                                title: d[1],
                                note: d[2],
                                i: i
                            }
                        })
                        t.shift()
                        setData(t)
                    }
                    ).catch((e)=>{
                        setData([])
                    })
            })
    }, [])
    return (<div>
    <Box 
        display="flex"
        flexWrap="wrap"
    >
<Grid container spacing={4}>



        {data.map(function(d,i){

            return (

         <Grid item sm={12} md={6} lg={4}>
                <Card className={classes.gcard}>
                <CardHeader
                    title = {d.title.replace(/_/g, " ")}
                >
                </CardHeader>
                 <CardMedia
        className={classes.gmedia}
        image={"/~yangz6/Nucleome_Browser/NB_session/example/thumbnail/tn_"+d.label+".jpg"}
        title={d.label}
      />
                <CardContent className={classes.gcardContent}>
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
            </Card> 
      </Grid>)
        })}
       {/*
         <Grid item sm={12} md={6} lg={4}>
        <Card className={classes.gcard}>
            <CardHeader
                title="ORM"
            >
            </CardHeader>
            <CardMedia className={classes.gmedia}
                    image={"/static/image/sessions/ORM.png"}
                    title="ORM"
            />
                <CardContent className={classes.gcardContent}>
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
      </Grid>
      */}
      </Grid>
    </Box>
        </div>);
}

const Gallery = withStyles(styles)(Index);

export default Gallery
