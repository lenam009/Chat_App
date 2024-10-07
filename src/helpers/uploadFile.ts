const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`;

const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'chat-app-file');

    const response = await fetch(url, {
        method: 'POST',
        body: formData,
    });

    return response;
};

export default uploadFile;
