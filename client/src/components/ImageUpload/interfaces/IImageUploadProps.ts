export interface IImageUploadProps {
    id: string,
    alt: string,
    imagePath: string | undefined,
    onChange?: (file: File | null) => void
}