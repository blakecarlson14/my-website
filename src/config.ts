// Site-wide settings. Edit these instead of hunting through components.

export const site = {
  name: "Blake Carlson",
  github: "https://github.com/blakecarlson14",
};

export const chess = {
  // Where the public Jev Plays Chess server lives (see "Put it on your website" in its README).
  url: "https://chess.blakeacarlson.com",
  // "invite": the server has ACCESS_CODE set, so only people with an invite link can play.
  //           The page links to the game and explains that it is invite-only.
  // "open":   no ACCESS_CODE, so anyone can play. The page also embeds the game.
  // Never put the access code itself here: this file ships to every visitor.
  access: "invite" as "invite" | "open",
  // Set to the repository URL once it is public, or leave null to hide the source link.
  source: null as string | null,
};
