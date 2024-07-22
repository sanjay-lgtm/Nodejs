// Event listener for file upload
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('attachment', document.getElementById('fileInput').files[0]);

    try {
        const response = await fetch('https://nodejs-5-2dpf.onrender.com/api/files/upload', {
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
            // Add file ID to dropdowns if needed
            const fileIdSelect = document.getElementById('fileIdSelect');
            const emailFileIdSelect = document.getElementById('emailFileIdSelect');
            const option = document.createElement('option');
            option.value = result.fileId;
            option.text = `File ID: ${result.fileId}, Name: ${result.fileName}, Size: ${result.fileSize} bytes`;

            fileIdSelect.appendChild(option);
            emailFileIdSelect.appendChild(option.cloneNode(true));
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('uploadResult').innerText = 'Upload failed. Please try again.';
    }
});

// Event listener for generating a shareable link
document.getElementById('generateLinkForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileId = document.getElementById('fileIdInput').value;

    try {
        const response = await fetch(`https://nodejs-5-2dpf.onrender.com/api/files/files/${fileId}`);
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

// Event listener for sending an email
document.getElementById('sendEmailForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailFileId = document.getElementById('emailFileIdInput').value;
    const email = document.getElementById('emailInput').value;

    try {
        const response = await fetch('https://nodejs-5-2dpf.onrender.com/api/files/send-email', {
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
