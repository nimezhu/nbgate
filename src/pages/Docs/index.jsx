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

function Index(props) {
    const {
        classes,
        version,
        rest
    } = props
    const myRef = useRef()
    useEffect((d) => {
        //TODO get match __
        //let {markdown} = params.markdown
        var converter = new showdown.Converter()
        var text
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
    return (
        <div ref={myRef}>
    </div>
    );
}

const Hints = withStyles(styles)(Index);

export default Hints
