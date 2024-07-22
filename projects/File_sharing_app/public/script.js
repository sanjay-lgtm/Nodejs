document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('attachment', document.getElementById('fileInput').files[0]);

    try {
        const response = await fetch('http://localhost:10000/api/files/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'Network response was not ok');
        }

       

        const result = await response.json();
        document.getElementById('uploadResult').innerText = result.message;
        
        if (result.success) {
            // Create a new option element for the dropdown
            const option = document.createElement('option');
            option.value = result.fileId;
            option.text = `File ID: ${result.fileId}, Name: ${result.fileName}, Size: ${result.fileSize} bytes`;
        
            // Append the option to the relevant dropdowns
            document.getElementById('fileDetailsSelect').appendChild(option);
            document.getElementById('fileIdSelect').appendChild(option.cloneNode(true));
            document.getElementById('emailFileIdSelect').appendChild(option.cloneNode(true));
            
            document.getElementById('fileDetailsDropdown').style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('uploadResult').innerText = 'Upload failed. Please try again.';
    }
});

document.getElementById('generateLinkForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileId = document.getElementById('fileIdSelect').value;

    try {
        const response = await fetch(`http://localhost:10000/api/files/${fileId}`);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Network response was not ok');
        }

        document.getElementById('linkResult').innerText = `Shareable link: ${result.sharableLink}`;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('linkResult').innerText = 'Failed to generate link. Please try again.';
    }
});

document.getElementById('sendEmailForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailFileId = document.getElementById('emailFileIdSelect').value;
    const email = document.getElementById('emailInput').value;

    try {
        const response = await fetch('http://localhost:10000/api/files/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fileId: emailFileId, email: email })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Network response was not ok');
        }

        document.getElementById('emailResult').innerText = result.message;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('emailResult').innerText = 'Failed to send email. Please try again.';
    }
});
