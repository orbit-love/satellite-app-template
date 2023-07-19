export default function MemberCard({ member }) {
  return (
    <li class="flex flex-col gap-6 xl:flex-row">
      <img
        class="aspect-[4/5] w-52 flex-none rounded-2xl object-cover"
        src={member.avatar_url}
        alt=""
      />

      <div class="flex-auto">
        <h2 class="text-lg font-semibold tracking-tight leading-8 text-gray-900">
          {member.name}
        </h2>

        <p class="text-base leading-7 text-gray-600">Senior Designer</p>
        <p class="mt-6 text-base leading-7 text-gray-600">
          Quia illum aut in beatae. Possimus dolores aliquid accusantium aut in
          ut non assumenda. Enim iusto molestias aut deleniti eos aliquid magnam
          molestiae. At et non possimus ab. Magni labore molestiae nulla qui.
        </p>
      </div>
    </li>
  );
}
