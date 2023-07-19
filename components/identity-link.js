import Image from "next/image";
import Link from "next/link";

export default function IdentityLink({ url, logo, alt }) {
  return (
    <Link href={url} target="_blank" rel="noreferrer noopener">
      <Image src={logo} width={40} height={40} alt={alt} />
    </Link>
  );
}
