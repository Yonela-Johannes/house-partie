import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Room = props => {
    const [data, setData] = useState({
        room_name: null,
        votes_to_skip: 2,
        guests_can_pause: false,
        is_hosts: false,
        host: null,
        total_users: 0,
    })

    useEffect(() => {
      const requestOptions = {
        method: 'GET'
    }
    const code = 'JFIMHSKYPR'
    fetch(`/api/room/${code}`, requestOptions).then((response) => (
       response.json()
    )).then((data) => setData(data[0]))
    }, [])
    console.log(data)
  return (
    <div>
        <h3>Name: {data.name}</h3>
        <p>Host: {data.host}</p>
        <p>Votes: {data.votes_to_skip}</p>
        <p>Guest can pause: {data.guests_can_pause ? "Yes" : "No"}</p>
        <p>Total Joined: {data.total_users}</p>
    </div>
  )
}

Room.propTypes = {}

export default Room