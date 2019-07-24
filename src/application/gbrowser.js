import React from "react"
import * as d3 from "d3"
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

import trackChr from "../cnb/track/chr"
import trackBw from "../cnb/track/bw"
import trackScale from "../cnb/track/scale"
import trackHic from "../cnb/track/hic"

import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import PageviewIcon from '@material-ui/icons/Pageview';


class GBrowserCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }
    componentDidMount() {
        const canvas = this.canvasRef.current;
                var gb = d3.select(canvas)
                gb.attr("height","300")
                gb.attr("width","300")
                var start = Math.floor(Math.random() * 248956422)
                var end = Math.floor(Math.random() * 248956422)
                if (start > end)
                {
                    var t = start;
                    start = end
                    end = t
                }
                var regions = [
                {
                    chr: "chr1",
                    start: start,
                    end: end
                }] //TODO CHANGE CHROMOSOME

                var chr = trackChr().width(200).x(50).y(10)
                gb.datum(regions)
                    .call(chr.canvas)


                var bw = trackBw().regions(regions).x(50).y(210).width(
                    200)
                var d = {
                    format: "bigwig",
                    server: "https://genome.compbio.cs.cmu.edu/d/spin",
                    prefix: "hg38/4dn.DamID",
                    id: "H1_DamID_LaminB"
                }
                gb.datum(d)
                    .call(bw.canvas)
                

                var chart = trackScale().x(50).y(50).width(200)
                
                gb.datum(regions).call(chart.canvas)

                var hic = trackHic().regions(regions).x(50).y(190)
                    .width(200).config(
                    {
                        min_bp: 5000,
                        color1: "#3F4498",
                        color2: "#FF0000",
                        norm: 1,
                        unit: 0,
                        oe: true
                    })
                var d = {
                    format: "hic",
                    server: "https://genome.compbio.cs.cmu.edu/d/spin",
                    prefix: "hg38/4dn.hic",
                    id: "H1_hg38"
                }
                gb.datum(d)
                    .call(hic.canvas);
    }
    render() {
        return (
      <div>
        <canvas ref={this.canvasRef} />
      </div>)
    }
}

class GBrowserCard extends React.Component {
    render() {
        const {classes,history} = this.props;
        function handleMore() {
            history.push("/panels/gbrowser")
        }
        return (<Card className={classes.card}>
         <CardHeader
            title="Genome Browser"
            subheader="supports .hic, bigwig and bigbed format"
             avatar={
          <Avatar aria-label="Feature" className={classes.avatar}>
             <PageviewIcon />
          </Avatar>
            }
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
            }

        />

         <CardContent className={classes.cardContent}>
            <GBrowserCanvas>
            </GBrowserCanvas>
        </CardContent>
        <CardActions>
        <Button size="small" color="primary" onClick={handleMore}>
          Learn More
        </Button>
        </CardActions>
        </Card>
        )
    }
}

export default GBrowserCard

