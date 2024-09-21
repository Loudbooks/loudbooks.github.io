export async function preload(src: string) {
    const resp = await fetch(src);
    const blob = await resp.blob();

    return new Promise(function (resolve) {
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => {
            console.error(error);
            resolve(null);
        }
    });
};