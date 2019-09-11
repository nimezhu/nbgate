import React, { useEffect, useState, useRef, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import {
    withStyles
} from "@material-ui/styles";
import styles from "../styles"

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import gsheetAgent from '../tools/gsheetAgent';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import DropDownTreeSelect from "react-dropdown-tree-select"
import 'react-dropdown-tree-select/dist/styles.css'

import nbAgent from "../tools/nbAgent"



const sheetid = "1pEgBTlA1sv3QSEkSL76XP27WXRTZpqhgeXqMzI-Mau0"
class CustomizedLabel extends PureComponent {
    render() {
        const {
            x, y, stroke, value,
        } = this.props;

        return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>;
    }
}

class CustomizedAxisTick extends PureComponent {
    render() {
        const {
            x, y, stroke, payload
        } = this.props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={6} textAnchor="end" fill="#666" transform="rotate(-85)">{payload.value}</text>
            </g>
        );
    }
}
function generateTree(d) {
    var keys = Object.keys(d).sort()
    var tree = []
    keys.forEach(function(k){
        var a  = {"label":k}
        if ("longLabel" in d[k] && typeof d[k]=="object") {
            //a["children"] = [{"label":d[k]["longLabel"]}]
            a["label"] = d[k]["longLabel"]
            a["id"]=k
        } else {
            var b = generateTree(d[k])
            a["children"] = b      
        }
        tree.push(a)
    })
    return tree
}
/*
function generateTree(d){
    var keys = Object.keys(d).sort()
    var tree = []
    keys.forEach(function(k){
        var a  = {"label":k}
        if (typeof d[k] == "object") {
            var b = generateTree(d[k])
            a["children"] = b      
        } else {
            a["children"] = [{"label":d[k]}]
        }
        tree.push(a)
    })
    return tree
}
*/
function Index(props) {
    const {
        classes,
        version
    } = props


    var [data, setData] = useState([])
    var [tree, setTree] = useState([])
    var [db, setDb] = useState({})
    const myRef = useRef(null)
    function renderData(d) {
        var d0 = d.filter((d) => {
            return "Count" in d && d.Count.length > 0 && d.Type == "track"
        })
        console.log(d0)
        setData(d0)
        //var node = myRef.current;
        //var ctx = node.getContext('2d')
        //ctx.fillText("Hello World",40,40)
    }
    useEffect(() => {
        var agent = gsheetAgent().title("Index").sheetid(sheetid)
        agent().then(renderData).catch(console.log) //TODO 
        //TODO
        /*
        fetch("http://vis.nucleome.org/d/portal/hg38/hg38_Dilution_Hi-C.hic/ls?attr=1",{}).then(function(d){
            return d.json()
        }).then(function(d){
            console.log(d)
            var keys = Object.keys(d)
            var k = keys.map(function(k0){
                return {"label":d[k0].longLabel,"id":k0}
            })
            setTree(k)
        })
        */

        var a = nbAgent().server("https://vis.nucleome.org/d/portal")
        a().then(function (d) {
            setDb(d)
            setTree(generateTree(d))
        }).catch(function (e) {
            console.log(e)
        })

        //agent set data and create chart using Ref and draw chart
    }, [])
    const onChange = (currentNode, selectedNodes) => {
        console.log("selected",selectedNodes)
        console.log("path::", currentNode.path); //set selected Nodes data
    };

    return (<div>
        <div>
            Functions
        <ul>
                <li>
                    Summary of <a href="https://docs.google.com/spreadsheets/d/1pEgBTlA1sv3QSEkSL76XP27WXRTZpqhgeXqMzI-Mau0" target="_blank">Current DataSet</a>
                    <BarChart width={400} height={500} data={data}>
                        <XAxis dataKey="Name" height={200} tick={<CustomizedAxisTick />} interval={0} />
                        <YAxis />
                        <Bar type="monotone" dataKey="Count" barSize={30} fill="#8884d8" />
                    </BarChart>
                </li>
                <li>
                    Easy Select Data Set from 4DNucleome and Create A Panel to Panel Space.
                    (Genome -> Sheet or Search)
                <DropDownTreeSelect data={tree} onChange={onChange} className="mdl" />
                </li>
                <li>
                    Start Browser with composed panel.
                <Button variant="outlined">PLay</Button>
                </li>
                <li>
                    Browse Meta Information
            </li>
            </ul>

        </div>

    </div>);
}

const Space = withStyles(styles)(Index);

export default Space
