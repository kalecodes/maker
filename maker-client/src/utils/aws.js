
async function uploadFile(file, signedRequest, url){
    try {
        const response = await fetch(signedRequest, {
            method: 'PUT',
            body: file
        });
        return response;
    } catch (err) {
        console.error(err);
        alert('Could not upload file')
    }
};

export async function getSignedRequest(file) {
    const queryUrl = `/api/sign-s3?file-name=${file.name}&file-type=${file.type}`;
    try {
        const response = await fetch(queryUrl, {
            method: 'GET'
        });
        const data = await response.json();
        return uploadFile(file, data.signedRequest, data.url);
    } catch (err) {
        console.error(err);
        alert('Could not get signed URL')
    }
}