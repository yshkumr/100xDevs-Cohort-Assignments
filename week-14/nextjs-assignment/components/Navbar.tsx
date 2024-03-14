import Link from "next/link";

export default function Navbar() {
  return (
    <div className="max-w-[90%] mx-auto flex justify-center space-x-48 mt-20">
      <Link
        className="p-2 px-4 text-lg border-2 border-black rounded-lg"
        href="/"
      >
        Home
      </Link>
      <Link
        className="p-2 px-4 text-lg border-2 border-black rounded-lg"
        href="static-page"
      >
        Server Page
      </Link>
      <Link
        className="p-2 px-4 text-lg border-2 border-black rounded-lg"
        href="interactive-page"
      >
        Client Page
      </Link>
    </div>
  );
}
