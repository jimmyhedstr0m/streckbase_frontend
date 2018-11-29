import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';

@Injectable()
export class ImageService {
  private pixels: Uint8ClampedArray;
  private treshold: number = 240;
  private imageWidth: number;
  private imageHeight: number;

  constructor() { }

  private opacity(value: number): number {
    return Math.floor(255 * value);
  }

  private shouldKillPixel(pixelIndex: number): boolean {
    const r = this.pixels[pixelIndex];
    const g = this.pixels[pixelIndex + 1];
    const b = this.pixels[pixelIndex + 2];

    return r >= this.treshold && g >= this.treshold && b >= this.treshold;
  }

  private smoothEdgeX(pixelIndex: number, positiveDirection: boolean) {
    const featherAlphas: number[] = [0.01, 0.2, 0.3, 0.4, 0.6, 0.8];
    const featherAlphasLength: number = featherAlphas.length;
    const alphaIndex: number = pixelIndex + 3;

    for (let i = 0; i < featherAlphasLength; i++) {
      const alpha: number = this.opacity(featherAlphas[i]);
      const nextIndex: number = positiveDirection ? alphaIndex + 4 * i : alphaIndex - 4 * i;
      this.pixels[nextIndex] = alpha;
    }
  }

  private smoothEdgeY(pixelIndex, positiveDirection) {
    const featherAlphas: number[] = [0.01, 0.2, 0.3, 0.4, 0.6, 0.8];
    const featherAlphasLength: number = featherAlphas.length;
    const alphaIndex: number = pixelIndex + 3;

    for (let i = 0; i < featherAlphasLength; i++) {
      const alpha: number = this.opacity(featherAlphas[i]);
      const nextIndex: number = positiveDirection ? alphaIndex + 4 * this.imageWidth * i : alphaIndex - 4 * this.imageWidth * i;
      this.pixels[nextIndex] = alpha;
    }
  }

  private yAxisPixelTraverse() {
    for (let x = 0; x < this.imageWidth; x++) {
      let topPixelFound: boolean = false;
      let bottomPixelFound: boolean = false;

      for (let y = 0; y < this.imageHeight; y++) {
        const topPixelIndex: number = 4 * (y * this.imageWidth + x);
        const bottomPixelIndex: number = 4 * ((this.imageHeight - 1 - y) * this.imageWidth + x);

        if (!topPixelFound && this.shouldKillPixel(topPixelIndex)) {
          this.pixels[topPixelIndex + 3] = 0;
        } else {
          if (!topPixelFound) {
            topPixelFound = true;
            this.smoothEdgeY(topPixelIndex, true);
          }
        }

        if (!bottomPixelFound && this.shouldKillPixel(bottomPixelIndex)) {
          this.pixels[bottomPixelIndex + 3] = 0;
        } else {
          if (!bottomPixelFound) {
            bottomPixelFound = true;
            this.smoothEdgeY(bottomPixelIndex, false);
          }
        }

        if (topPixelFound && bottomPixelFound) {
          break;
        }
      }
    }
  }

  private xAxisPixelTraverse() {
    for (let y = 0; y < this.imageHeight; y++) {
      const passedPixels: number = y * this.imageWidth;
      let leftPixelFound: boolean = false;
      let rightPixelFound: boolean = false;

      for (let x = 0; x < this.imageWidth; x++) {
        const leftPixelIndex: number = 4 * (passedPixels + x);
        const rightPixelIndex: number = 4 * (passedPixels + (this.imageWidth - 1 - x));

        if (!leftPixelFound && this.shouldKillPixel(leftPixelIndex)) {
          this.pixels[leftPixelIndex + 3] = 0;
        } else {
          if (!leftPixelFound) {
            leftPixelFound = true;
            this.smoothEdgeX(leftPixelIndex, true);
          }
        }

        if (!rightPixelFound && this.shouldKillPixel(rightPixelIndex)) {
          this.pixels[rightPixelIndex + 3] = 0;
        } else {
          if (!rightPixelFound) {
            rightPixelFound = true;
            this.smoothEdgeX(rightPixelIndex, false);
          }
        }

        if (rightPixelFound && leftPixelFound) {
          break;
        }
      }
    }
  }

  convertImage(imageUrl: string): Promise<string> {
    return new Promise((resolve, _reject) => {
      const image: HTMLImageElement = new Image();
      image.src = environment.apiUrl + "/systembolaget/image?url=" + imageUrl + "&t=" + new Date().getTime();
      image.setAttribute('crossOrigin', '');

      return image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        this.imageWidth = image.naturalWidth;
        this.imageHeight = image.naturalHeight;
        canvas.width = this.imageWidth;
        canvas.height = this.imageHeight;

        ctx.drawImage(image, 0, 0);

        const imageData = ctx.getImageData(0, 0, this.imageWidth, this.imageHeight);
        this.pixels = imageData.data;
        this.yAxisPixelTraverse();
        this.xAxisPixelTraverse();

        ctx.putImageData(imageData, 0, 0);

        this.pixels = null;
        this.imageWidth = null;
        this.imageHeight = null;

        return resolve(canvas.toDataURL("image/png"));
      }
    });
  }

}