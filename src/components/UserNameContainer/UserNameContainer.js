import React from 'react'
import { connect } from 'react-redux'
import Typography from "@material-ui/core/Typography";

const getUsername = (username) => {
    return username
  }
const UserNameContainer = ({ username }) => {  
    return (
      <Typography>
          {username}
      </Typography>
    )
  }

  const mapStateToProps = state => ({
    username: getUsername(state.username)
  })
  

export default connect(mapStateToProps)(UserNameContainer)