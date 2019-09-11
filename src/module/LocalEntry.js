import React,{useEffect} from "react"
import Chip from '@material-ui/core/Chip';
import localforage from "localforage"
import Box from '@material-ui/core/Box';
function EntryDiv(props) {
    const {classes} = props
    useEffect(() => {
        var _db = localforage.createInstance({
            "name": "nbSession"
        })
        _db.keys().then(function(d) {
            if (d.length == 0) {
            } else {
                setData(d)
            }
        })
    }, [])
    const handleClickFactory = function(d){
        return function(){
        window.location.href = "/v1/main.html?config=localstorage:"+d
    }
    }
    const [data, setData] = React.useState([]);
    return (<Box>
        {
            data.map(function(d,i){
                return (<Chip className={classes.chip} label={d} onClick={handleClickFactory(d)}></Chip>)
            })
        }

    </Box>)
}
export default EntryDiv