export function isRichTextEmpty(
    html: string,
): boolean {
    if (!html) {
        return true;
    }

    const parser =
        new DOMParser();

    const document =
        parser.parseFromString(
            html,
            "text/html",
        );

    const text =
        document.body.textContent
            ?.replace(/\u00a0/g, " ")
            .trim();

    return !text;
}