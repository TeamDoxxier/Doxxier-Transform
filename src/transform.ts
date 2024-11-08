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

    public async Init(wasmLocationOrByteArray?: string | ByteArray) {
        if (typeof wasmLocationOrByteArray === 'string') {
            await initializeImageMagick(wasmLocationOrByteArray);
        } else if (wasmLocationOrByteArray instanceof Uint8Array) {
            await initializeImageMagick(wasmLocationOrByteArray);
        } else {
            throw new Error('Wasm location must be provided explicitly in the browser');
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