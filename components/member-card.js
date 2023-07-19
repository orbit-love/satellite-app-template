import IdentityLink from "./identity-link";

export default function MemberCard({ member }) {
  return (
    <li className="flex flex-col gap-6 xl:flex-row" key={member.id}>
      {/* We cannot use next/Image here since avatars are remotely loaded
          & we do not know the full list of sources for them */}
      <img
        className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover"
        src={member.avatar_url}
        alt=""
      />

      <div className="flex-auto">
        <h2 className="text-xl font-semibold tracking-tight leading-8 text-gray-900">
          {member.name}
        </h2>

        <section className="flex flex-col my-2 space-y-2">
          {member.identities.map((identity) => (
            <IdentityLink identity={identity} key={identity.id} />
          ))}
        </section>

        <p className="mt-6 text-base leading-7 text-gray-600">
          Quia illum aut in beatae. Possimus dolores aliquid accusantium aut in
          ut non assumenda.
        </p>
      </div>
    </li>
  );
}
