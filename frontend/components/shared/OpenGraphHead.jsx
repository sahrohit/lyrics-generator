import Head from "next/head";

const OpenGraphHead = () => {
	return (
		<Head>
			<title>Lyrics Generator</title>
			<meta name="title" content="Lyrics Generator" />
			<meta
				name="description"
				content="Made with love and powered by Tenserflow, Python, and Nextjs, this Lyrics Generator is ready to write songs for you."
			/>

			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://lyricsgenerator.vercel.app/" />
			<meta
				property="og:title"
				content="Lyrics Generator with Pytorch, Python & Nextjs"
			/>
			<meta
				property="og:description"
				content="Made with love and powered by Tenserflow, Python, and Nextjs, this Lyrics Generator is ready to write songs for you."
			/>
			<meta
				property="og:image"
				content="https://lyricsgenerator.vercel.app/meta-image.webp"
			/>

			<meta property="twitter:card" content="summary_large_image" />
			<meta
				property="twitter:url"
				content="https://lyricsgenerator.vercel.app/meta-image.webp"
			/>
			<meta
				property="twitter:title"
				content="Lyrics Generator with Tenserflow, Python & Nextjs"
			/>
			<meta
				property="twitter:description"
				content="Made with love and powered by TEnserflow, Python, and Nextjs, this Lyrics Generator  is ready to write songs for you."
			/>
			<meta
				property="twitter:image"
				content="https://lyricsgenerator.vercel.app/meta-image.webp"
			></meta>
		</Head>
	);
};

export default OpenGraphHead;
