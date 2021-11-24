export interface IImageUploadProps {
    id: string,
    alt: string,
    imagePath: string | undefined,
    isNewImage: boolean
    setIsNewImage: (isNewImage: boolean) => void
    onChange?: (file: File | null) => void
}
