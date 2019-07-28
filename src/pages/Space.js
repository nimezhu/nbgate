import React from 'react';
import ReactDOM from 'react-dom';
import {
    withStyles
} from "@material-ui/styles";
import styles from "../styles"

import PanelIcons from "../panel/icons"
import localforage from "localforage"
import * as d3 from "d3"

class PanelSpace extends React.Component {
    componentDidMount() {
        var nbPanel = localforage.createInstance({
            "name": "nbPanel"
        })
        var _r = function (el) {
            el.each(function (d) {
                var el0 = d3.select(this)
                var h = el0.append("div").classed("panel-heading", true)
                var title = h.append("h3").classed("panel-title", true).html(d)
                var btnGrp = title.append("span").style("float", "right").style("padding-right", "0px")
                btnGrp.append("button")
                    .classed("btn", true)
                    .classed("btn-default", true)
                    .classed("btn-xs", true)
                    .on("click", function () {
                        var a = window.confirm("Delete " + d + " ?")
                        if (a) {
                            var v = nbPanel.removeItem(d).then(function () {
                                el0.remove()
                            })
                        }
                    })
                    .classed("glyphicon", true)
                    .classed("glyphicon-remove", true)
                    .attr("title", "delete")


                var b = el0.append("div").classed("panel-body", true)
                nbPanel.getItem(d).then(function (d0) {
                    var d = JSON.parse(d0)

                    if (d.render in PanelIcons) { //TODO Remove S
                        var r = PanelIcons[d.render]().width(270)
                        var e = b.selectAll("svg").data([d])
                        e.enter()
                            .append("svg")
                            .merge(e)
                            .call(r)
                    } else {
                        el0.text(d.name + " " + ":TODO render")
                    }

                })


            })
        }  
        
        var el = d3.select(ReactDOM.findDOMNode(this));
        nbPanel.keys().then(function (d) {
            console.log("d",d)
            if (d.length == 0) {
                el.html(`<div class="panel panel-default">No Panel in panel space yet</div>`)
            } else {
                var a = el.selectAll("div").data(d);
                a.enter()
                    .append("div")
                    .classed("panel", true)
                    .classed("panel-default", true)
                    .merge(a)
                    .call(_r)
                a.exit().remove()
            }
        })
    }
    render() {
        return (<div>
        </div>)
    }
}

function Index(props) {
    const {
        classes,
        version
    } = props
    return ( <div>
        <div> {version} </div> 
        <PanelSpace classes={classes}/>
        </div>
    );
}

const Space = withStyles(styles)(Index);

export default Space