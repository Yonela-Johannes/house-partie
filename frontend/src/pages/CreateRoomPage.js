import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {Grid, Button, Typography, TextField, FormHelperText, FormControl, RadioGroup, FormControlLabel, Radio } from "@material-ui/core"

function CreateRoomPage() {
    const [inputData, setInpuData] = useState({
        host: "",
        maximum_guests: 1,
        guest_can_pause: true,
        votes_to_skip: 2
    })

    const handleChange = (e) => {
        const { name } = e.target
        setInpuData({
            votes_to_skip: name == 'votes_to_skip' ? e.target.value : inputData.votes_to_skip,
            host: name == 'host' ? e.target.value : inputData.host,
            maximum_guests:  name == 'maximum_guests' ? e.target.value : inputData.maximum_guests,
            guest_can_pause: name == 'guest_can_pause' ? e.target.value  === 'true' ? true : false : inputData.guest_can_pause
            }
        )
    }


    const handleSubmit = () => {
        const requestOptions = {
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
                body: JSON.stringify({
                    host: inputData.host,
                    maximum_guests: inputData.maximum_guests,
                    votes_to_skip: inputData.votes_to_skip,
                    guest_can_pause: inputData.guest_can_pause
                })
            }
        }
        console.log(requestOptions)
        fetch("/api/create-room", requestOptions).then((response) => (
            response.json()
        )).then((data) => console.log(data))
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center" >
                <Typography h4="h4" variant="h4">
                    Create a room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center" >
                <FormControl h4="h4" variant="h4">
                    <TextField required="true" type="text" name='host' defaultValue={inputData.host} onChange={handleChange} inputProps={{style: {textAlign: "center"}}} />
                    <FormHelperText>
                        <div align="center">
                           Room host
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center" >
                <FormControl h4="h4" variant="h4">
                    <FormHelperText>
                        <div align="center">
                            Guest Control of Playback State
                        </div>
                    </FormHelperText>
                    <RadioGroup onChange={handleChange} name="guest_can_pause" row defaultValue="true">
                        <FormControlLabel value="true" label="Play/Pause" labelPlacement='bottom' control={<Radio color="primary" />} />
                        <FormControlLabel value="false" label="No Control" labelPlacement='bottom' control={<Radio color="secondary" />} />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center" >
                <FormControl h4="h4" variant="h4">
                    <TextField required="true" type="number" name="votes_to_skip" defaultValue={inputData.votes_to_skip} onChange={handleChange} inputProps={{min: 1, style: {textAlign: "center"}}} />
                    <FormHelperText>
                        <div align="center">
                           Votes required to skip song
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center" >
                <FormControl h4="h4" variant="h4">
                    <TextField required="true" type="number" name="maximum_guests" defaultValue={inputData.maximum_guests} onChange={handleChange} inputProps={{min: 1, style: {textAlign: "center"}}} />
                    <FormHelperText>
                        <div align="center">
                           Maximum guests
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center" >
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Create a Room
                </Button>
            </Grid>
            <Grid item xs={12} align="center" >
                <Button color="secondary" variant="contained" to="/" component={Link} >
                    Back
                </Button>
            </Grid>
        </Grid>
    )
}

export default CreateRoomPage;