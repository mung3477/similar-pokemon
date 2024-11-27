import Image from 'next/image';

export default function Search({
	uploadedImages,
	loading,
	handleFileChange,
	handleUpload
}) {
	return (
	<div style={{ textAlign: "center", marginTop: "50px" }}>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: "10px" }} disabled={loading}>
        Upload
      </button>
        <div style={{ marginTop: "20px" }}>
          {uploadedImages.length > 0 &&
            uploadedImages.map((imgUrl, index) => (
              <Image
                key={imgUrl}
                src={imgUrl}
                alt={`Result ${index + 1}`}
                style={{ margin: "10px", width: "200px", height: "200px" }}
              />
            ))}
        </div>
      </div>
		)
}
