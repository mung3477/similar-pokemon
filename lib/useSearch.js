import { useEffect, useState } from "react";

import ky from "ky";

import decodeBase64 from "./decode";

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
				const results = await Promise.allSettled(
					images.map(async (image) => {
						const pokemonName = image.name;
						try {
							const speciesResponse = await ky
								.get(
									`https://pokeapi.co/api/v2/pokemon-species/${pokemonName.toLowerCase()}`
								)
								.json();
							const koreanNameObj = speciesResponse.names.find(
								(nameObj) => nameObj.language.name === "ko"
							);
							const koreanName = koreanNameObj
								? koreanNameObj.name
								: pokemonName;
							return {
								src: decodeBase64(image.image),
								name: koreanName,
							};
						} catch (error) {
							console.error("Error fetching Korean name:", error);
							return {
								src: decodeBase64(image.image),
								name: pokemonName, // Use English name if error occurs
							};
						}
					})
				);
				setUploadedImages(
					results.map((result) =>
						result.status === "fulfilled"
							? result.value
							: result.reason
					)
				);
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
		} finally {
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
