import Image from "next/image";
import Link from "next/link";

export default function IdentityLink({ identity }) {
  let logo;
  switch (identity.type) {
    case "twitter_identity":
      logo = "/twitter-icon-blue.png";
      break;
    case "linkedin_identity":
      logo = "/linkedin-icon-blue.png";
      break;
    default:
      break;
  }

  return (
    <Link
      href={identity.profile_url}
      target="_blank"
      rel="noreferrer noopener"
      className="block inline-flex gap-2 items-center"
    >
      <Image
        src={logo}
        width={30}
        height={30}
        alt={identity.type.replace("_", " ")}
        className="w-auto h-8"
      />

      <span className="text-lg text-gray-600 dark:text-gray-200">
        @{identity.username}
      </span>
    </Link>
  );
}
