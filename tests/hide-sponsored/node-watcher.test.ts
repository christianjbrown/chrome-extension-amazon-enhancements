import { NodeWatcher } from "../../src/hide-sponsored/node-watcher";

function watch(root: Node) {
  const changed = vi.fn();
  new NodeWatcher((callback) => new MutationObserver(callback), root).watch(
    changed,
  );
  return changed;
}

describe("NodeWatcher", () => {
  it("reports elements added anywhere below the root", async () => {
    const root = document.createElement("div");
    root.append(document.createElement("section"));
    const changed = watch(root);
    const result = document.createElement("p");

    root.firstElementChild!.append(result);

    await vi.waitFor(() => {
      expect(changed).toHaveBeenCalledWith(result);
    });
  });

  it("reports text that arrives on its own as its parent", async () => {
    const root = document.createElement("div");
    const label = document.createElement("span");
    root.append(label);
    const changed = watch(root);

    label.append("Sponsored");

    await vi.waitFor(() => {
      expect(changed).toHaveBeenCalledExactlyOnceWith(label);
    });
  });

  it("ignores blank text and comments", async () => {
    const root = document.createElement("div");
    const changed = watch(root);

    root.append("  \n ", document.createComment("Sponsored"));
    root.append(document.createElement("b"));

    await vi.waitFor(() => {
      expect(changed).toHaveBeenCalledOnce();
    });
    expect(changed).toHaveBeenCalledWith(root.lastElementChild);
  });

  it("ignores text with no parent element", async () => {
    const fragment = document.createDocumentFragment();
    const changed = watch(fragment);

    fragment.append("Sponsored", document.createElement("b"));

    await vi.waitFor(() => {
      expect(changed).toHaveBeenCalledOnce();
    });
  });
});
