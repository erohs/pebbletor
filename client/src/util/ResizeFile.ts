import Resizer from "react-image-file-resizer";

export const resizeFile = (file: File) => {
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            64,
            64,
            "PNG",
            100,
            0,
            (uri) => {
                resolve(uri);
            },
            "blob"
        )
    });
}
