export interface SelectedImage {
    id: string;
    file: File;
    previewUrl: string;
}

export interface ImageValidationResult {
    validImages: File[];
    errors: string[];
}