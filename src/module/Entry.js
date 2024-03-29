import React from "react"
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';

//TODO Set Sheet ID , How TO Set Sheet ID???
class EntryDiv extends React.Component {
    handleClick() {
        console.log("TODO")
    }
    constructor(props) {
        super(props);
        var sheetId = props.sheetid || "1N_viSL6hDY_n75dVP4bfiLJ99SOPzIfqrka1JvJjv4E"
        var title = props.title || "Publish"

        var self = this;
        this.state = {
            "d": []
        }
        this.sheetid = sheetId
        var apiKey = "AIzaSyBhECk4C1LpxI1mDJjSTwot-hRP2v3bwEA"
        var url = "https://sheets.googleapis.com/v4/spreadsheets/" + sheetId + "/values/" + title + "!A:C?key=" + apiKey
        var cors = "https://vis.nucleome.org/cors/"
        fetch(url).then(function(d) {
            return d.json()
        }).then(function(d) {
            var t = d.values.map(function(d) {
                return {
                    label: d[0],
                    note: d[1]
                }
            })
            self.setState({
                "d": t
            })
        }).catch(function(e) {
            fetch(cors + url, {
                    headers: {
                        Origin: "https://vis.nucleome.org"
                    }
                }).then((d) => {
                    return d.json()
                })
                .then((d) => {
                    var t = d.values.map(function(d) {
                        return {
                            label: d[0],
                            note: d[1]
                        }
                    })
                    self.setState({
                        "d": t
                    })

                }).catch((e)=>{
                    self.setState({"d":[]})
                })
        })


    }
    handleClick(d, sheetid) {
        return function() {
            var location = "/v1/main.html?config=gsheet:" + sheetid + ":" + d.label.replace(" ", "%20")
            window.location.href = location
        }
    }
    continueClick() {
        var location = "/v1/main.html?config=continue"
        window.location.href = location
    }
    hubsClick() {
        var location = "/v1/main.html?initedLayout=hubs"
        window.location.href = location
    }

    render() {

        const {
            classes
        } = this.props;
        const {
            d
        } = this.state
        var sheetid = this.sheetid
        return (<div>
                        <div>
                            
                        { d.length == 0 ? "Loading.." : d.map((d) => 
                            <Tooltip title={d.note} aria-label={d.note}>
                            <Chip className={classes.chip} label={d.label} onClick={this.handleClick(d,sheetid)}/> 
                            </Tooltip>
                        ) }
                        </div>
              </div>)
    }
}

export default EntryDiv
