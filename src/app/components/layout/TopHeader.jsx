import Image from "next/image";
import Link from "next/link";

export default function TopHeader() {
  return (
    <div className="bg-[var(--component-bg)] w-full shadow-lg rounded-lg">
      <div className="max-w-7xl mx-auto flex justify-center items-center py-4">
        <Link href="/">
          <Image
            src="https://res.cloudinary.com/dijssimbb/image/upload/v1771186076/LGI_1_awfgfe.png"
            alt="Lord Ganesha Impex"
            width={320}
            height={75}
            priority
          />
        </Link>
      </div>
    </div>
  );
}
