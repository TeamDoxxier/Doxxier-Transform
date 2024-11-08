import { Transformer } from '../src/transform';
import { initializeImageMagick, ImageMagick, MagickImage, MagickFormat } from '@imagemagick/magick-wasm';
import fs from 'fs';

describe('Transformer', () => {
    let transformer: Transformer;

    beforeAll(async () => {
    });

    beforeEach(() => {
    });

    it('should transform an image to AVIF format and resize it to 300x300', async () => {
        transformer = new Transformer();
        const wasm = new Uint8Array(fs.readFileSync(__dirname + '/../node_modules/@imagemagick/magick-wasm/dist/magick.wasm'));
        await transformer.Init(wasm);
        const filename = __dirname + '/test-samples/transform_test.png';
        let file = fs.readFileSync(filename)
        const result = await transformer.Transform(filename, file!);

        expect(result).toBeInstanceOf(Uint8Array);
    });

    it('should initialize ImageMagick if not initialized', async () => {
        transformer = new Transformer();
        const filename = __dirname + '/test-samples/transform_test.png';
        let file = fs.readFileSync(filename)

        expect.assertions(1);
        try {
            await transformer.Transform(filename, file);
        }catch(e: any) {
            expect(e.message).toBe("ImageMagick not initialized");
        }
    });
});