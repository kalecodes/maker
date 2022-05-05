
function uploadFile(file, signedRequest, url){
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // display img preview on form page
                document.getElementById('preview').src = url;
                // store URL in hidden imput to be submitted for storage in the app
                document.getElementById('image-url').value = url;
            } else {
                alert('Could not uplaod file.');
            }
        }
    };
    xhr.send(file);
};

function getSignedRequest(file) {
    const xhr = new XMLHttpRequest();
    // pass name and mime type as parameters to GET request to construct signed request
    xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                uploadFile(file, response.getSignedRequest, response.url);
            }
        } else {
            alert('Could not get signed URL.');
        }
    }
    xhr.send();
}

module.exports = { getSignedRequest, uploadFile}