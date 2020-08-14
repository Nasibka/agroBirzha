import { SET_USERNAME,GET_USERNAME } from '../actions/actions.js';
import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";


const set_username = (state,username)=>{
    console.log('get_username')
    const initialState = (
        <div style={{display:'flex',alignItems:'center'}}>
        <Typography variant='caption' align='center' style={{width:'300px'}}>
          <Link href="/admin/entrance">
            Войти
          </Link>
          &nbsp;или&nbsp;
          <Link href="/admin/registration" >
            Зарегистрироваться
          </Link>
        </Typography>
        </div>
    );
    if(username){
        console.log('username is set '+username)
        return {...state,username:username}
    }else{
        return {...state,username:initialState}
    }
}
// const get_username = (state)=>{
//     const username = state.username
//     console.log(username)
//     return {...state,username:""}
// }
function userNameReducer(state, action) {
    switch (action.type) {
        case SET_USERNAME:
            return set_username(state,action.username);
        // case GET_USERNAME:
        //     return get_username(state)
        default:
            return state
    }
}

export default userNameReducer ;