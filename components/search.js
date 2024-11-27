import Image from 'next/image';

export default function Search({
	preview,
	uploadedImages,
	loading,
	handleFileChange,
	handleUpload
}) {
	return (
	<div className="flex flex-col items-center justify-center" style={{ textAlign: "center", marginTop: "50px" }}>

		<div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: "10px" }} disabled={loading}>
        Upload
      </button>
	  </div>
	  {preview && (
			<div className="w-fit" style={{ marginTop: "20px" }}>
				<h3>Selected Image Preview:</h3>
				<Image src={preview} alt="Selected Preview" width={300} height={300} style={{ maxWidth: "300px", maxHeight: "300px" }} />
			</div>
		)}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px]" style={{ marginTop: "20px" }}>
          {uploadedImages.length > 0 &&
            uploadedImages.map((imgUrl, index) => (
              <Image
                key={imgUrl}
                src={imgUrl}
                alt={`Result ${index + 1}`}
                width={300}
                height={300}
                style={{ margin: "10px", width: "200px", height: "200px" }}
              />
            ))}
        </div>
      </div>
		)
}
