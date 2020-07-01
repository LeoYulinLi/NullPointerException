import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Loading } from "../widgets";
import { fetchUser } from "../../actions/user_actions";

const { useState } = require("react");

const UserInfo = () => {

  const { id } = useParams();

  /**
   * @param {RootState} state
   */
  const userSelector = state => state.users;

  /**
   * @type {Object<number, User>}
   */
  const users = useSelector(userSelector);

  const user = users[id];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(id))
  }, [id]);

  return <Loading>
    <h1>{ user?.display_name }</h1>
    <ul>
      <li>Username: { user?.username }</li>
      <li>ID: { user?.id }</li>
    </ul>
  </Loading>

}

export default UserInfo;