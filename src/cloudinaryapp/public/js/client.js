var myWidget = cloudinary.createUploadWidget({
  cloudName: 'dthv50qgh',
  upload_preset: 'ihfwipla'
}, (error, result) => { if (result.event == "success") {
    console.log(result.info) // result.info contains data from upload
} })
