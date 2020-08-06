import {
    successColor,
    whiteColor,
    grayColor,
    hexToRgb
  } from "assets/jss/material-dashboard-react.js";

import bgImage from "assets/img/back2.jpeg";
const dashboardStyle = {
    mainBanner:{
        backgroundImage:`url(${bgImage})`,
        backgroundSize:'cover',
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center',
        // backgroundColor:grayColor[0],
        height:'80vh',
        width:'100%',
        padding:"0"

    },
    overlay:{
        backgroundColor:"black",
        opacity:'0.8',
        height:'80vh',
        padding:"0"

    },
    mainText:{
        padding:'6rem',
        lineHeight:'3rem'
    },
    title:{
        fontSize: '2rem',
        color: 'white',
        lineHeight:'2rem',
        fontWeight:'400'

    },
    subTitle:{
        fontSize: '1.5rem',
        color: 'white',
    },
    button:{
        fontWeight: '400',
        fontSize: '1em',
        textDecoration: 'none',
        color: '#f9f6f1',
        padding: '15px',
        position: 'relative',
        border: '3px solid #f9f6f1',
        borderRadius: '0.5rem',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        height:'1rem'
    },
    buttonItem:{
        marginTop:'2.5rem'
    },
    successText: {
      color: successColor[0]
    },
    upArrowCardCategory: {
      width: "16px",
      height: "16px"
    },
    stats: {
      color: grayColor[0],
      display: "inline-flex",
      fontSize: "12px",
      lineHeight: "22px",
      "& svg": {
        top: "4px",
        width: "16px",
        height: "16px",
        position: "relative",
        marginRight: "3px",
        marginLeft: "3px"
      },
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        top: "4px",
        fontSize: "16px",
        position: "relative",
        marginRight: "3px",
        marginLeft: "3px"
      }
    },
    cardCategory: {
      color: grayColor[0],
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      paddingTop: "10px",
      marginBottom: "0"
    },
    cardCategoryWhite: {
      color: "rgba(" + hexToRgb(whiteColor) + ",.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    cardTitle: {
      color: grayColor[2],
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: grayColor[1],
        fontWeight: "400",
        lineHeight: "1"
      }
    },
    cardTitleWhite: {
      color: whiteColor,
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: grayColor[1],
        fontWeight: "400",
        lineHeight: "1"
      }
    },
    cardCategoryWhite: {
      color: grayColor[7],
      margin: "0",
      fontWeight: "500",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    cardTitleWhite: {
      color: successColor[2],
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none"
    }
  };
  
  export default dashboardStyle;
  