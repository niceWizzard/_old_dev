import Link from "next/link";

export default function Header() {
  return (
    <header className="px-2 py-3 border-b border-b-blue-400">
      <div className="mx-auto container flex gap-3  justify-between w-full">
        <h1>Hiling</h1>
        <nav className="flex gap-3 ">
          <Link href="/request">Request</Link>
          <Link href="#">About</Link>
        </nav>
      </div>
    </header>
  );
}
