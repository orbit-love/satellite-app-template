import { fetchIdentityUrls, fetchIdentity } from "./member-helpers";

const mockIncluded = [
  {
    id: 1,
    type: "twitter_identity",
    attributes: { profile_url: "http://twitter.com/profile" },
  },
  {
    id: 2,
    type: "linkedin_identity",
    attributes: { profile_url: "http://linkedin.com/profile" },
  },
];

const mockMember = {
  relationships: {
    identities: {
      data: [
        { id: 1, type: "twitter_identity" },
        { id: 2, type: "linkedin_identity" },
      ],
    },
  },
};

describe("#fetchIdentityUrls", () => {
  it("fetches identity URLs correctly", () => {
    const identityUrls = fetchIdentityUrls(mockMember, mockIncluded);
    expect(identityUrls).toEqual({
      twitter_url: "http://twitter.com/profile",
      linkedin_url: "http://linkedin.com/profile",
    });
  });
});

describe("#fetchIdentity", () => {
  it("fetches twitter identity correctly", () => {
    const identity = fetchIdentity(
      "twitter_identity",
      mockMember.relationships.identities.data,
      mockIncluded
    );
    expect(identity).toEqual(mockIncluded[0]);
  });

  it("fetches linkedin identity correctly", () => {
    const identity = fetchIdentity(
      "linkedin_identity",
      mockMember.relationships.identities.data,
      mockIncluded
    );
    expect(identity).toEqual(mockIncluded[1]);
  });

  it("returns undefined if type is not present", () => {
    const identity = fetchIdentity(
      "fake_identity",
      mockMember.relationships.identities.data,
      mockIncluded
    );
    expect(identity).toEqual(undefined);
  });

  it("returns undefined if id is not found", () => {
    const differentMockMember = {
      relationships: {
        identities: {
          data: [
            { id: 3, type: "twitter_identity" },
            { id: 4, type: "linkedin_identity" },
          ],
        },
      },
    };

    const identity = fetchIdentity(
      "linkedin_identity",
      differentMockMember.relationships.identities.data,
      mockIncluded
    );
    expect(identity).toEqual(undefined);
  });

  it("returns undefined if member identities are empty", () => {
    const identity = fetchIdentity("fake_identity", [], mockIncluded);
    expect(identity).toEqual(undefined);
  });

  it("returns undefined if included identities are empty", () => {
    const identity = fetchIdentity(
      "fake_identity",
      mockMember.relationships.identities.data,
      []
    );
    expect(identity).toEqual(undefined);
  });
});
