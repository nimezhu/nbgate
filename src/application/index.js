import React from 'react';
import {withStyles} from "@material-ui/styles"
import styles from "../styles"
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import NbIcon from "../module/NbIcon";
import GBrowserCard from "./gbrowser"

class Index extends React.Component {
  render() {
    const { classes,history } = this.props;
    return (
      <div>
        <Container>
        <Card className={classes.card}>
        <NbIcon scale="0.1"/>
        </Card>
        <GBrowserCard classes={classes} history={history}/>
        </Container>
      </div>
    );
  }
}

const Application = withStyles(styles)(Index);


export default Application;

