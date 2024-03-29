import React from "react"
import Typography from '@material-ui/core/Typography';
 /*
              Developed by <a href="https://www.cs.cmu.edu/~jianma/" target="_blank">the Ma Lab</a> @ CMU
            */
            
function AppFooter(props) {
const {classes} = props;

return ( <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" gutterBottom>
             <Typography align="right" type="span">
              <a href="https://www.cmu.edu" target="_blank">
              <img style={{top:10,height:53}} src="/entry/images/cmu_logo_1.jpg"/>
              </a>
              <a href="https://4dnucleome.org" target="_blank">
              <img style={{top:10,height:53}} src="/entry/images/4dn-logo_1.png"/>
              </a>
              </Typography>
        </Typography>
      </footer>
)

}

export default AppFooter
