const styles = theme => ({
    flag: {
        align: "center",
        paddingTop: 15,
        paddingBottom:50
    },
    nchar: {
        color: "#226A98",
        fontFamily: "Helvetica",
        fontWeight: "bold"
    },
    bchar: {
        color: "#CE5156",
        fontFamily: "Helvetica",
        fontWeight: "bold"
    },

  icon: {
  },
  card: {
    minHeight: '500px',
    minWidth: '350px',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
    
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up(1200 + theme.spacing(1*2))]: {
      width: 1200,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing(0)}px 0`,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(1.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 0,
    paddingTop: '100.0%',
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: "#550000",
  },
   menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
    outline: 'none',
    textAlign:'center',
  },
    toolbarButtons: {
        marginLeft: 'auto',
        marginRight: -12,
    },
    root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: 'white',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  button: {
    margin: theme.spacing(0.5),
  },


});



export default styles


