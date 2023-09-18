import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useMemo, useRef } from 'react'
import { ImageGallery } from '../components'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveNote } from '../../store/journal/journalSlice'
import { startDeletingNote, startSavingNote, startUploadingFiles } from '../../store/journal/thunks'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {


    const { active: activeNote, messageSaved, isSaving } = useSelector(state => state.journal);

    const { body, title, onInputChange, formState, date } = useForm(activeNote)

    const dateString = useMemo(() => {
        const newDate = new Date(date);

        return newDate.toUTCString();
    }, [date])


    const fileImputRef = useRef();


    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(setActiveNote(formState)) ;
    }, [formState]);

    useEffect(() => {
    if(messageSaved.length>0){
        Swal.fire('Nota actualizada', messageSaved, 'success');
    }
    }, [messageSaved])
    

    const onSaveNote = () =>{
        dispatch( startSavingNote()  );
    }

    const onFileInputChange = ({target})=>{
        if(target.files === 0) return;
         dispatch(startUploadingFiles(target.files));

    }

    const onDelete = () => {
       dispatch(startDeletingNote());
    }




  return (
   <Grid 
   container 
   direction='row'
    justifyContent='space-between' 
    alignItems='center'
    sx={{mb:1}}
    >
        <Grid item>
            <Typography fontSize={39 } fontWeight='light'>
                {dateString}
            </Typography>
        </Grid>
        <Grid item>


            <input 
            type="file" 
            multiple
            ref={fileImputRef}
            onChange={onFileInputChange}
            style={{display:"none"}}
            />

            <IconButton
            color='primary'
            disabled={isSaving}
            onClick={()=>fileImputRef.current.click()}
            >
                <UploadOutlined/>
            </IconButton>

            <Button 
            disabled={isSaving}
            onClick={onSaveNote}
            color='primary'
             sx={{padding: 2 }} 

             >
                <SaveOutlined sx={{ fontSize: 30, mr:1 }}

                
                />
                Guardar
            </Button>
           
        </Grid>
        <Grid container>
            <TextField 
            type='text'
            variant='filled'
            fullWidth
            placeholder='ingrese un titulo'
            label='Titulo'
            sx={{border: 'none', mb: 1 }}
            name='title'
            value={title}
            onChange={onInputChange}
            />

<TextField 
            type='text'
            variant='filled'
            fullWidth
            multiline
            placeholder='¿Que sucedió en el día hoy?'
            minRows= {5}
            name='body'
            value={body}
            onChange={onInputChange}
            />
        
        </Grid>

        <Grid container justifyContent = 'end'>
            <Button
            onClick={onDelete}
            sx={{mt: 2}}
            color='error'
            >
                <DeleteOutline/>
            </Button>

        </Grid>


       <ImageGallery images = {activeNote.imageUrls}
       />
       
   </Grid>
  )
}
