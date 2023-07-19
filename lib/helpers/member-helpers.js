/**
 * fetches the profile URLs for Twitter and LinkedIn from a member's identities
 *
 * @param {Object} member - the member object containing attributes & identity information, fetched from Orbit
 * @param {Array} included - an array of identity objects that may contain the member's identities, fetched from Orbit
 * @returns {Object} an object containing the profile URLs for Twitter and LinkedIn
 */
export function fetchIdentityUrls(member, included) {
  const identities = member.relationships.identities.data;

  const twitter_identity = fetchIdentity(
    "twitter_identity",
    identities,
    included
  );

  const linkedin_identity = fetchIdentity(
    "linkedin_identity",
    identities,
    included
  );

  return {
    twitter_url: twitter_identity?.attributes?.profile_url,
    linkedin_url: linkedin_identity?.attributes?.profile_url,
  };
}

/**
 * fetches an identity of a specific type from an array of identities,
 * provided the identity id is present in the list of identities
 *
 * @param {string} identity_type - the type of identity to fetch (e.g., "twitter_identity")
 * @param {Array} identities - an array of identity objects
 * @param {Array} included - an array of identity objects that may contain the target identity
 * @returns {Object|null} the found identity object or null if no such identity was found
 */
export function fetchIdentity(identity_type, identities, included) {
  const identity_id = identities.find(
    (identity) => identity.type === identity_type
  )?.id;

  return included.find(
    (identity) => identity.type === identity_type && identity.id === identity_id
  );
}
