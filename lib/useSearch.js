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
			const response = await fetch("MODAL_LABS_API_ENDPOINT", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error("Failed to upload image");
			}

			const { images } = await response.json();
			if (images instanceof Array)
				setUploadedImages(images.map(decodeBase64));
			// Expecting an array of base64 image strings
			else
				throw new Error(
					`Invalid response from the server: ${toString(images)}`
				);
		} catch (error) {
			setError("에러가 발생했어요:", error);
			setUploadedImages([
				"https://pokemonletsgo.pokemon.com/assets/img/common/char-pikachu.png",
				"https://images.secretlab.co/theme/common/collab_pokemon_catalog_charizard-min.png",
				"https://assets.nintendo.com/image/upload/ar_4:3,b_transparent,c_lpad/f_auto/q_auto/dpr_1.5/c_scale,w_400/ncom/en_US/games/switch/p/pokemon-legends-arceus-switch/egdp/pokemon-1",
			]); // Expecting an array of image URLs
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
