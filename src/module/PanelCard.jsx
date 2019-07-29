import React, {
    useEffect
} from "react"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PanelIcons from "../panel/icons"
import * as d3 from "d3"

function PanelCard(props) {
    const {
        id,
        db
    } = props
    const [hide, setHide] = React.useState(false)
    const [data, setData] = React.useState({})
    const handleDelete = function() {
        db.removeItem(id).then(function() {
            setHide(true)
        })
    }
    const svgRef = React.createRef()
    useEffect(function() {
        db.getItem(id).then(function(d0) {
            var d = JSON.parse(d0)
            console.log(d)
            var svg = d3.select(svgRef.current)
            if (d.render in PanelIcons) { //TODO Remove S
                var r = PanelIcons[d.render]().width(270)
                var e = svg.selectAll("g").data([d])
                e.enter()
                    .append("g")
                    .merge(e)
                    .call(r)
            } else {
                //el0.text(d.name + " " + ":TODO render")
            }

        })

    }, [])
    return (
        <Card style={{"width":"300px"}} hidden={hide}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {id}
          </Typography>
          <Typography component="div">
            <svg ref={svgRef}></svg>
        </Typography>
        </CardContent>
        <CardActions>
        <Button size="small" color="primary" onClick={handleDelete}>
            Delete
        </Button>
        </CardActions>
        </Card>
    )
}
export default PanelCard
