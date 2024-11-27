import { useState } from 'react';

export default function useSearch() {
	const [selectedFile, setSelectedFile] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [uploadedImages, setUploadedImages] = useState([]);

	const handleFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
	  };

  const handleUpload = async () => {
	if (!selectedFile) {
	  alert("Please select a file!");
	  return;
	}

	const formData = new FormData();
	formData.append("image", selectedFile);

	try {
	setLoading(true);
	setError(null)
	  const response = await fetch("MODAL_LABS_API_ENDPOINT/search", {
		method: "POST",
		body: formData,
	  });

	  if (!response.ok) {
		throw new Error("Failed to upload image");
	  }

	  const images = await response.json();
	  setUploadedImages(images); // Expecting an array of image URLs
	} catch (error) {
		setError("에러가 발생했어요:", error);
	} finally {
		setLoading(false)
	}
  };

  return {
    uploadedImages, error, loading, handleFileChange, handleUpload
  }
}
