export async function blobToBuffer (blob:Blob):Promise<ArrayBuffer> {
    const reader = new FileReader()

    return new Promise((resolve, reject) => {
        reader.addEventListener('loadend', onLoadEnd, false)
        reader.addEventListener('error', onErr, false)

        reader.readAsArrayBuffer(blob)

        function onErr (ev) {
            reader.removeEventListener('error', onErr, false)
            reader.removeEventListener('loadend', onLoadEnd, false)
            reject(ev)
        }

        function onLoadEnd () {
            reader.removeEventListener('loadend', onLoadEnd, false)
            reader.removeEventListener('error', onErr, false)
            resolve(reader.result as ArrayBuffer)
        }
    })
}

export default blobToBuffer
