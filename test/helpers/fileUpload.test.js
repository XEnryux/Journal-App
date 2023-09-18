import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";


cloudinary.config({
    cloud_name:"curso-react-udemyd",
    api_key: "197381239961586",
    api_secret: "OQJ1VietTACCs8w04kE5jfRQnBE",
    secure: true

})


describe('Pruebas en fileUpload', () => {

    test('debe de subir el archivo correctamente a cloudinary',
     async() => { 

const imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPj8G4NMOEj2r9LcfA71DVfOE5DgWSfKgRWQ&usqp=CAU";
const resp = await fetch(imageUrl);
const blob = await resp.blob();
const file = new File([blob],"foto.jpg");

const url = await fileUpload(file);
expect(typeof url).toBe('string');

const segments = url.split('/');
const imageId = segments[segments.length - 1].replace('.png','');


await cloudinary.api.delete_resources(['journal/'+ imageId ])



     })

test('debe de retornar null', async() => { 

    const file = new File([], "foto.jpg");
    const url = await fileUpload( file );
    expect(url).toBe( null );


})


})