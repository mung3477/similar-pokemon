import {
  useEffect,
  useState,
} from 'react';

import decodeBase64 from './decode';

export default function useSearch() {
	const [selectedFile, setSelectedFile] = useState(null);
	const [preview, setPreview] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [uploadedImages, setUploadedImages] = useState([]);

	useEffect(() => {
		if (selectedFile) {
			const objectUrl = URL.createObjectURL(selectedFile);
			setPreview(objectUrl);

			// Cleanup the URL when the component is unmounted or file changes
			return () => URL.revokeObjectURL(objectUrl);
		} else {
			setPreview(null);
		}
	}, [selectedFile]);

	const handleFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
		setUploadedImages([]);
		setError(null);
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
			setError(null);

			const response = await fetch(
				process.env.NEXT_PUBLIC_MODAL_ENDPOINT,
				{
					method: "POST",
					body: formData,
				}
			);

			if (!response.ok) {
				throw new Error("Failed to upload image");
			}

			const { images } = await response.json();

			if (images instanceof Array) {
				const decoded = images.map((image) => ({
					src: decodeBase64(image.image),
					name: image.name,
				}));
				setUploadedImages(decoded);
			}
			// Expecting an array of base64 image strings
			else {
				throw new Error(
					`Invalid response from the server: ${toString(images)}`
				);
			}
		} catch (error) {
			console.log(error);
			setError(`에러가 발생했어요: ${error}`);
			setLoading(false);
		}
	};

	const onClickStartOver = () => {
		setSelectedFile(null);
		setUploadedImages([]);
	};

	return {
		preview,
		uploadedImages,
		error,
		loading,
		handleFileChange,
		handleUpload,
		onClickStartOver,
	};
}
