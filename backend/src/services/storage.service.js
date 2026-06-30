const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URI_ENDPOINT
});

async function uploadFile(file, fileName) {
    const result = await imagekit.upload({
        file: file, //required
        fileName: fileName, //required
    })

    return result;
}

module.exports = {
    uploadFile
}