
import React from "react"

import Typography from '@material-ui/core/Typography';
class NbBanner extends React.Component {
    render() {
        const {
            classes
        } = this.props;
        return (
            <div className={classes.flag}>
                  <Typography component="h2" variant="h3" color="textPrimary" align="center" gutterBottom>
                    <span className={classes.nchar}>Nucleome</span> 
                    <span>  </span>
                    <span className={classes.bchar}>Browser</span>
                  </Typography>
                  <Typography variant="h5" color="textSecondary" align="center" paragraph>
                  </Typography>
                  <Typography paragraph>
                  </Typography>
                </div>
        )
    }

}

export default NbBanner