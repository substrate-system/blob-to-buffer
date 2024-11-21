import { test } from '@bicycle-codes/tapzero'
import { blobToBuffer } from '../src/index.js'

const blob = new Blob([new Uint8Array([1, 2, 3])], {
    type: 'application/octet-binary'
})

test('Basic tests', async t => {
    const buf = await blobToBuffer(blob)
    const aaa = blob.arrayBuffer()
    t.deepEqual(buf, new ArrayBuffer(8))
})
