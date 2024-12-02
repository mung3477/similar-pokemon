import Footer from 'components/footer';
import Search from 'components/search';
import useSearch from 'lib/useSearch';
import Head from 'next/head';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const appName = "닮은 꼴 포켓몬 찾기";
export const appMetaDescription =
	"사진을 업로드하고, 닮은 꼴 포켓몬을 찾아보세요!";

export default function Home() {
	const {
		preview,
		uploadedImages,
		error,
		loading,
		handleFileChange,
		handleUpload,
		onClickStartOver,
	} = useSearch();

	return (
		<div>
			<Head>
				<title>{appName}</title>
				<meta name="description" content={appMetaDescription} />
				<meta property="og:title" content={appName} />
				<meta property="og:description" content={appMetaDescription} />
				<meta property="og:image" content="/OAK.jpg" />
			</Head>
			<main className="container max-w-[700px] mx-auto p-5">
				<hgroup>
					<h1 className="text-center text-5xl font-bold m-6">
						{appName}
					</h1>
				</hgroup>
				<Search
					preview={preview}
					uploadedImages={uploadedImages}
					loading={loading}
					handleFileChange={handleFileChange}
					handleUpload={handleUpload}
				/>
				<div className="mx-auto w-full">
					{error && (
						<p className="bold text-center mt-4 text-red-500 pb-5">
							{error}
						</p>
					)}
				</div>
				<Footer onClickStartOver={onClickStartOver} />
			</main>
		</div>
	);
}
