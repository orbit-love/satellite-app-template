import { fetchIdentities, fetchIdentity } from "./member-helpers";

const mockIncluded = [
  {
    id: 1,
    type: "twitter_identity",
    attributes: {
      profile_url: "http://twitter.com/profile",
      username: "profile",
    },
  },
  {
    id: 2,
    type: "linkedin_identity",
    attributes: {
      profile_url: "http://linkedin.com/profile",
      username: "profile",
    },
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

describe("#fetchIdentities", () => {
  it("fetches identity URLs correctly", () => {
    const identities = fetchIdentities(mockMember, mockIncluded);
    expect(identities).toEqual([
      {
        profile_url: "http://twitter.com/profile",
        type: "twitter_identity",
        username: "profile",
      },
      {
        profile_url: "http://linkedin.com/profile",
        type: "linkedin_identity",
        username: "profile",
      },
    ]);
  });

  it("ignores identities that are missing", () => {
    const differentMockIncluded = [
      {
        id: 2,
        type: "linkedin_identity",
        attributes: {
          profile_url: "http://linkedin.com/profile",
          username: "profile",
        },
      },
    ];

    const identities = fetchIdentities(mockMember, differentMockIncluded);
    expect(identities).toEqual([
      {
        profile_url: "http://linkedin.com/profile",
        type: "linkedin_identity",
        username: "profile",
      },
    ]);
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
