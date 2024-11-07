import {
    initializeImageMagick,
    ImageMagick, 
    Magick,
    MagickImage, 
    MagickFormat,
    ByteArray,
    IMagickImage
} from '@imagemagick/magick-wasm';

export class Transformer {
    private isInitialised: boolean;

    constructor() {
        this.isInitialised = false;
    }

    public async Init(wasmLocationOrByteArray?: URL | ByteArray) {
        if (wasmLocationOrByteArray instanceof URL) {
            await initializeImageMagick(wasmLocationOrByteArray);
        } else if (wasmLocationOrByteArray instanceof Uint8Array) {
            await initializeImageMagick(wasmLocationOrByteArray);
        } else {
            const wasmLocation = new URL('@imagemagick/magick-wasm/magick.wasm', import.meta.url);
            await initializeImageMagick(wasmLocation);
        }
        this.isInitialised = true;
    }

    public async Transform(filename: string, file: ByteArray): Promise<Uint8Array> {
        if (!this.isInitialised) {
            throw new Error('ImageMagick not initialized');
        }

        try {
            let image = MagickImage.create();
            image.read(new Uint8Array(file));
  
            image.resize(300,300)
            image.format = MagickFormat.Avif
            const output = image.write((data) => {
                return new Uint8Array(data);
            });
            image.dispose();
            return output;
        } catch (error: Error | any) {
            throw new Error(`Transformation failed: ${error.message}`);
        }
    }
}