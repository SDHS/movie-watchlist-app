import { Image } from '@nextui-org/image';

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
            className="h-[40px] w-[120px]"
          />
        </a>
      </div>
    </footer>
  );
}
