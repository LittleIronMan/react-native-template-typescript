from PIL import Image
import os
import io

# (tr, tg, tb) is tint color
def tintImage(imgPath, outPath, tr, tg, tb):
    with Image.open(imgPath) as img:
        pixels = img.load()  # create the pixel map
        for i in range(img.size[0]):  # for every pixel:
            for j in range(img.size[1]):
                r, g, b, a = pixels[i, j]
                pixels[i, j] = (round(r * tr / 255), round(g * tg / 255), round(b * tb / 255), a)
        img.save(outPath)

def main():
    # tint color
    tr = 181
    tg = 181
    tb = 181
    if not os.path.exists("./out"):
        os.mkdir("./out")

    for file in os.listdir("."):
        if file.endswith(".png"):
            tintImage(file, "out/" + file, tr, tg, tb)

if __name__ == '__main__':
    main()
    print("Completed!")

# imgByteArr = io.BytesIO()
# img.save(imgByteArr, format='BMP')
# imgByteArr = imgByteArr.getvalue()
if False: #  https://stackoverflow.com/a/36468996
    pixels = img.load()  # create the pixel map
    for i in range(img.size[0]):  # for every pixel:
        for j in range(img.size[1]):
            if pixels[i, j] != (255, 0, 0):
                # change to black if not red
                pixels[i, j] = (0, 0, 0)
if False: #  https://stackoverflow.com/a/11064935
    #rgb_im = img.convert('RGBA')
    rgb_im = img.convert()
    p = rgb_im.getpixel((1, 1))
    rgb_im.putpixel()
    #r, g, b = rgb_im.getpixel((1, 1))
