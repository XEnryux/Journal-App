

export const fileUpload = async( file ) =>{

    //if(!file) throw new Error('no se ha cargado ningun archivo');
 
   
    const cloudURL = 'https://api.cloudinary.com/v1_1/curso-react-udemyd/upload';

    const formData = new FormData();
    formData.append('upload_preset','curso-react');
    formData.append('file', file );

    try { 

        const resp = await fetch(cloudURL,{
            method: 'POST',
            body: formData
        });

        if(!resp.ok) throw new Error('no se pudo abrir la imagen')
        const cloudResp = await resp.json();

        return cloudResp.secure_url;
        
    } catch (error) {
        //throw Error(error.message);
        return null;
    }
}