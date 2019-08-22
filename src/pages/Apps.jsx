import React, {
    useEffect
} from "react"
import ReactDOM from 'react-dom';
import {
    withStyles
} from "@material-ui/styles";
import styles from "../styles"


import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AppCard from "../module/AppCard"


function Index(props) {
    const {
        classes,
        version
    } = props
    const [apps, setApps] = React.useState([]);
    useEffect(() => {
        fetch("/static/apps/apps.json").then(
            function(d){
                return d.json()
            }
        ).then(d => {
            setApps(d)
        }
        )
    }, [])
    return (<div>
    <Typography>
        Web Apps works with Nucleome Browser
    </Typography>
    <Box
        display="flex"
        flexWrap="wrap" 
        >
        {apps.map(function(o,i){return <AppCard data={o}/>})}
    </Box>
        </div>);
}

const Space = withStyles(styles)(Index);

export default Space
