import { TurnedInNot } from "@mui/icons-material";
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import PropTypes from 'prop-types';
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/app";

export const SideBarItem = ({ id, title = "", body, date, imageUrls = [] }) => {

  const dispatch = useDispatch();

  const onClickNote = () => {
    dispatch( setActiveNote({ id, title, body, date, imageUrls }) );
  }

  const newTitle = useMemo(() => {
    return title.length > 17 
      ? title.substring(0, 17) + '...' 
      : title
  }, [title]);

  const newBody = useMemo(() => {
    return body.length > 17 
      ? body.substring(0, 45) + '...' 
      : body
  }, [body]);

  return (
    <ListItem disablePadding > 
        <ListItemButton onClick={ onClickNote } >

            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>

            <Grid container>
                <ListItemText primary={ newTitle } sx={{ mb: 0 }} />
                <ListItemText secondary={ newBody } />
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}

SideBarItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  date: PropTypes.number,
  imageUrls: PropTypes.array
}
