
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material'
import { setActiveNote } from '../../store/journal/journalSlice'
import { useDispatch } from 'react-redux'


export const SidebarItem = ({title = "",body,id,date,imageUrls =[]}) => {

const dispatch = useDispatch();

  const onClickNote = () => {
   dispatch(setActiveNote({title,body,id,date,imageUrls})) 
  }


  return (
    <ListItem> 
    <ListItemButton onClick={onClickNote}>
        <ListItemIcon>
            <TurnedInNot/>
        </ListItemIcon>
        <Grid container>
            <ListItemText primary ={title}/>
            <ListItemText secondary ={body}/>

        </Grid>

    </ListItemButton>

    </ListItem>
  
  )
}
