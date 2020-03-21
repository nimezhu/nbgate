import React, {
    useRef,
    useEffect
} from 'react';
import showdown from "showdown";
import {
    withStyles
} from "@material-ui/styles";
import styles from "../../styles"

import getUrlParam from "../../tools/getUrlParam.js"

import Paper from "@material-ui/core/Paper"

function Index(props) {
    const {
        classes,
        version,
        rest
    } = props
    const myRef = useRef()
    useEffect((d) => {
        //TODO get match __ from GitHub Raw???
        var converter = new showdown.Converter()
        converter.setOption("tables",true)
        converter.setFlavor("vanilla")
        var text 
        //TODO Change Static to GitHub Docs         
        // With Buffer Version Control
        fetch("/static/markdown/"+rest+".md").then((d)=>(d.text())
        )
        .then(function(d){
                text = d
                var html = converter.makeHtml(text); //TODO catch error
                myRef.current.innerHTML = html
        })
        .catch(function(e){
            text= "## Markdown file not found"
            var html = converter.makeHtml(text); //TODO catch error
            myRef.current.innerHTML = html
        })

    }, [])
    //TODO With Paper 
    return (
        <Paper ref={myRef} className={classes.paper}>
    </Paper>
    );
}

const Hints = withStyles(styles)(Index);

export default Hints
