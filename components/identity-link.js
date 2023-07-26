import Image from "next/image";
import Link from "next/link";

export default function IdentityLink({ identity }) {
  let lightThemeLogo, darkThemeLogo;
  switch (identity.type) {
    case "twitter_identity":
      lightThemeLogo = "/twitter-icon-blue.svg";
      darkThemeLogo = "/twitter-icon-white.svg";
      break;
    case "linkedin_identity":
      lightThemeLogo = "/linkedin-icon-blue.svg";
      darkThemeLogo = "/linkedin-icon-white.svg";
      break;
    default:
      break;
  }

  return (
    <Link
      href={identity.profile_url}
      target="_blank"
      rel="noreferrer noopener"
      className="block inline-flex gap-2 items-center w-min"
    >
      <Image
        src={lightThemeLogo}
        width={35}
        height={35}
        alt={identity.type.replace("_", " ")}
        className="block w-10 h-auto dark:hidden min-w-[35px]"
      />

      <Image
        src={darkThemeLogo}
        width={35}
        height={35}
        alt={identity.type.replace("_", " ")}
        className="hidden min-w-[35px] w-10 h-auto dark:block"
      />

      <span className="hover:text-brand-dark-highlight focus:text-brand-dark-highlight text-brand-dark dark:hover:text-brand-light-highlight dark:focus:text-brand-light-highlight dark:text-brand-light text-lg hover:underline focus:underline">
        @{identity.username}
      </span>
    </Link>
  );
}
