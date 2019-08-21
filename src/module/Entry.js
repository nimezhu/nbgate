import React from "react"
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
class EntryDiv extends React.Component {
    handleClick() {
        console.log("TODO")
    }
    constructor(props) {
        super(props);
        var self = this;
        this.state = {
            "d": []
        }
        var sheetId = "1N_viSL6hDY_n75dVP4bfiLJ99SOPzIfqrka1JvJjv4E"
        var title = "Publish"
        var apiKey = "AIzaSyBhECk4C1LpxI1mDJjSTwot-hRP2v3bwEA"
        fetch("https://sheets.googleapis.com/v4/spreadsheets/" +
            sheetId + "/values/" + title + "!A:C?key=" + apiKey).then(function(d){return d.json()}).then(function(d) {
            
            var t = d.values.map(function(d) {
                return {
                    label: d[0],
                    note: d[1]
                }
            })
            self.setState({
                "d": t
            })
            })


    }
    handleClick(d) {
        return function() {
            var sheetId = "1N_viSL6hDY_n75dVP4bfiLJ99SOPzIfqrka1JvJjv4E"
            var location = "/v1/main.html?config=gsheet:" + sheetId + ":" + d.label.replace(" ", "%20")
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
        return (<div>
                        <div>
                        { d.length && d.map((d) => 
                            <Tooltip title={d.note} aria-label={d.note}>
                            <Chip className={classes.chip} label={d.label} onClick={this.handleClick(d)}/>
                            </Tooltip>
                        ) }
                        </div>
              </div>)
    }
}

export default EntryDiv
