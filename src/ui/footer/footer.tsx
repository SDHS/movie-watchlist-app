import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="flex items-center justify-center border p-4">
      <div className="m-auto mx-auto flex items-center gap-2">
        <p className="text-medium">Developed using </p>
        <a
          href="https://developer.themoviedb.org/"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="./tmdb_logo.svg"
            alt="TMDB logo"
            height={80}
            width={120}
          />
        </a>
      </div>
    </footer>
  );
}
