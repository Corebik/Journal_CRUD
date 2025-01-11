import { IconButton } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { AddOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/app";

export const JournalPage = () => {

  const { isSaving, active } = useSelector( state => state.journal );

  const dispatch = useDispatch();

  const onClickNewNote = () => {

    dispatch( startNewNote() );

  } 

  return (
    <JournalLayout>

      {
        // eslint-disable-next-line no-extra-boolean-cast
        (!!active)
          ? <NoteView />
          : <NothingSelectedView />
      }

      <IconButton 
        disabled={ isSaving }
        onClick={ onClickNewNote }
        size="large" 
        sx={{ 
          color: 'white', 
          backgroundColor: 'error.main', 
          transition: '0.2s ease-in-out',

          ':hover': { opacity: 0.85, backgroundColor: 'error.main' },
          '&.Mui-disabled': {backgroundColor: 'grey.300', color: 'grey.700' }, 

          position: "fixed",
          right: 50,
          bottom: 50
          }}>
        <AddOutlined sx={{ fontSize: 24 }} />
      </IconButton>

    </JournalLayout>
  )
}
