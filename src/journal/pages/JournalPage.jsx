import { IconButton, Typography } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { AddBoxOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal/thunks";



export const JournalPage = () => {


  const dispatch = useDispatch();
  const {isSaving, active} =useSelector(state => state.journal);

  const onClickNewNote = () =>{
    dispatch(startNewNote());

  }


    return(
    <JournalLayout>

    
    {
      (!!active)
      ? <NoteView/>
      : <NothingSelectedView/> 
    }
     


      <IconButton
      onClick={onClickNewNote}
      size='large'
      disabled={isSaving}
      sx={{
        color: 'white',
        backgroundColor:'error.main',
        ':hover':{ backgroundColor:'error.main', opacity:0.7},
        position:'fixed',
        right:50,
        bottom:50
      }}
      >
        <AddBoxOutlined sx={{fontSize: 30}}/>
      </IconButton>





    </JournalLayout>
    )  
  };