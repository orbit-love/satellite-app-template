import Image from "next/image";
import Link from "next/link";
import IdentityLink from "./identity-link";

export default function MemberCard({ member }) {
  return (
    <li class="flex flex-col gap-6 xl:flex-row">
      {/* We cannot use next/Image here since avatars are remotely loaded
          & we do not know the full list of sources for them */}
      <img
        class="aspect-[4/5] w-52 flex-none rounded-2xl object-cover"
        src={member.avatar_url}
        alt=""
      />

      <div class="flex-auto">
        <h2 class="text-xl font-semibold tracking-tight leading-8 text-gray-900">
          {member.name}
        </h2>

        <section className="inline-flex gap-4 my-2">
          {!!member.twitter_url ? (
            <IdentityLink
              url={member.twitter_url}
              logo="/twitter-logo-blue.png"
              alt=""
            />
          ) : (
            <></>
          )}

          {!!member.linkedin_url ? (
            <IdentityLink
              url={member.linkedin_url}
              logo="/linkedin-logo-blue.png"
              alt=""
            />
          ) : (
            <></>
          )}
        </section>

        <p class="mt-6 text-base leading-7 text-gray-600">
          Quia illum aut in beatae. Possimus dolores aliquid accusantium aut in
          ut non assumenda. Enim iusto molestias aut deleniti eos aliquid magnam
          molestiae. At et non possimus ab. Magni labore molestiae nulla qui.
        </p>
      </div>
    </li>
  );
}
