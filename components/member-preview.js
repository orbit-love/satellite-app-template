import Image from "next/image";
import { useState } from "react";

export default function MemberPreview({ member }) {
  const [imageError, setImageError] = useState(false);

  return (
    <li key={member.id}>
      {imageError || !member.avatar_url ? (
        <div className="mx-auto w-56 h-56 bg-gray-100 rounded-full dark:bg-gray-800"></div>
      ) : (
        <Image
          className="mx-auto w-56 h-56 rounded-full"
          // To remote load images in Next you need to specify their source
          // in next.config.js -> images -> remotePatterns. Orbit avatar URLs
          // come from a number of different sources, so we're trying to catch
          // as many as possible by accepting the common sources.
          src={member.avatar_url}
          width={300}
          height={375}
          alt=""
        />
      )}

      <h2 className="text-brand-dark dark:text-brand-light mt-6 text-xl font-semibold tracking-tight leading-7 text-center">
        {member.name}
      </h2>
    </li>
  );
}
