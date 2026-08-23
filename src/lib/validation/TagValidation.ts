import { journalDetailsConstants } from "@/constants/journal/journal-details";

const {
    maxTags,
    maxTagLength,
} = journalDetailsConstants.tags;

export interface TagValidationResult {
    valid: boolean;
    tag?: string;
    message?: string;
}

export function sanitizeTag(tag: string): string {
    return tag.trim();
}

export function isDuplicateTag(
    tag: string,
    existingTags: string[]
): boolean {
    return existingTags.some(
        (existingTag) =>
            existingTag.toLowerCase() === tag.toLowerCase()
    );
}

export function validateTag(
    rawTag: string,
    existingTags: string[]
): TagValidationResult {
    const tag = sanitizeTag(rawTag);

    if (!tag) {
        return {
            valid: false,
            message: "Tag cannot be empty.",
        };
    }

    if (isDuplicateTag(tag, existingTags)) {
        return {
            valid: false,
            message: "This tag already exists.",
        };
    }

    if (existingTags.length >= maxTags) {
        return {
            valid: false,
            message: `You can add up to ${maxTags} tags.`,
        };
    }

    if (tag.length > maxTagLength) {
        return {
            valid: false,
            message: `Tags cannot exceed ${maxTagLength} characters.`,
        };
    }

    return {
        valid: true,
        tag,
    };
}