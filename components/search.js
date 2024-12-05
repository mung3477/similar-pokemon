import Image from 'next/image';
import Loader from 'react-spinners/HashLoader';

export default function Search({
	preview,
	uploadedImages,
	loading,
	handleFileChange,
	handleUpload,
}) {
	return (
		<div
			className="flex flex-col items-center justify-center my-8"
			style={{ textAlign: "center" }}
		>
			<div
				className="w-fit flex flex-col items-center"
				style={{ marginTop: "20px" }}
			>
				{preview ? (
					<>
						<h3 className="text-lg">선택한 이미지:</h3>
						<Image
							src={preview}
							alt="Selected Preview"
							width={300}
							height={300}
							style={{ maxWidth: "300px", maxHeight: "300px" }}
						/>
					</>
				) : (
					<>
						<Image
							src="/OAK.jpg"
							alt="Default Preview"
							width={300}
							height={300}
							style={{ maxWidth: "300px", maxHeight: "300px" }}
						/>
						<p className="text-center text-xl opacity-60 mt-6">
							사진을 업로드하고, 닮은 꼴 포켓몬을 찾아보세요!
						</p>
					</>
				)}
			</div>
			{loading && (
				<div className="my-16">
					<Loader color="#1edac5" size={100} />
					<p className="mt-8 text-[#1edac5]">유사도 비교 중...</p>
				</div>
			)}
			{uploadedImages.length > 0 && (
				<div className="mt-6">
					<h3 className="text-lg">가장 닮은 3개의 포켓몬:</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-[12px]">
						{uploadedImages.map(({ src, name }) => (
							<div key={src}>
								<Image
									src={src}
									alt={name}
									width={300}
									height={300}
									style={{
										margin: "10px",
										width: "200px",
										height: "200px",
									}}
								/>
								<p className="mt-4">{name}</p>
							</div>
						))}
					</div>
				</div>
			)}
			<div className="mt-8">
				<input
					type="file"
					onChange={handleFileChange}
					accept="image/*"
					disabled={loading}
				/>
				<button
					onClick={handleUpload}
					style={{ marginLeft: "10px" }}
					disabled={loading}
				>
					업로드
				</button>
			</div>
		</div>
	);
}
