import uvail from "../src";

describe("uvail", () => {
  describe("uvail.google", () => {
    test("returns true if username is available", async () => {
      const username = "username" + Math.random().toString().slice(2, 8);
      const isAvailable = await uvail.google(username);
      expect(isAvailable).toBe(true);
    });

    test("returns false if username is taken", async () => {
      const isAvailable = await uvail.google("cool.cat");
      expect(isAvailable).toBe(false);
    });
  });
});
