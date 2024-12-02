import {
  Code as CodeIcon,
  XCircle as StartOverIcon,
} from 'lucide-react';
import Link from 'next/link';

export default function Footer({ onClickStartOver }) {
	return (
		<footer className="w-full my-8">
			<div className="text-center">
				<button className="lil-button" onClick={onClickStartOver}>
					<StartOverIcon className="icon" />
					다시 하기
				</button>
				<Link
					href="https://github.com/mung3477/similar-pokemon"
					className="lil-button"
					target="_blank"
					rel="noopener noreferrer"
				>
					<CodeIcon className="icon" />
					웹사이트 코드 보러 가기
				</Link>
			</div>

			<div className="text-center lil-text mt-8">
				<div className="inline-block py-2 px-4 border border-yellow-200 rounded-lg bg-[#fef6aa]">
					🤔 프로젝트가 마음에 드셨나요?{" "}
					<Link
						href="https://github.com/mung3477/similar-pokemon"
						target="_blank"
					>
						여기
					</Link>
					에 가셔서 프로젝트에 대한 피드백을 남겨주세요!
				</div>
			</div>

			<div className="text-center lil-text mt-8">
				Powered by{" "}
				<Link
					href="https://modal.comhttps://www.timothybrooks.com/instruct-pix2pix/"
					target="_blank"
				>
					Modal labs
				</Link>
				,{" "}
				<Link href="https://vercel.com" target="_blank">
					Vercel
				</Link>
				,{" and"}
				<Link
					href="https://aiku.notion.site/AIKU-b614c69220704b848758e5cf21a54238?pvs=74"
					target="_blank"
				>
					AIKU
				</Link>
			</div>
		</footer>
	);
}
