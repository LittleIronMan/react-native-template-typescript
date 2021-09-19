import os
import re
#from cairosvg import svg2png
#from wand.api import library
import wand.color
import wand.image

# позаимствованно отсюда: https://stackoverflow.com/questions/10383305/how-to-resize-an-svg-with-imagick-imagemagick
# а это ссылка непосредственно на сам вопрос: https://stackoverflow.com/a/13484470
def svgScaleHack(svg, minWidth, minHeight):
    reW = r"(.*<svg[^>]* width=\")([\d.]+)px"
    reH = r"(.*<svg[^>]* height=\")([\d.]+)px"
    width = re.match(reW, svg, re.S | re.I)
    height = re.match(reH, svg, re.S | re.I)
    if not width or not height:
        return None
    width = int(width.group(2))
    height = int(height.group(2))

    scale = 1
    if width < minWidth:
        scale = minWidth / width
    if height < minHeight:
        scale = max(scale, minHeight / height)
    width *= scale
    height *= scale

    width = str(int(width))
    height = str(int(height))

    svg = re.sub(reW, r"\g<1>" + width + r"px", svg)
    svg = re.sub(reH, r"\g<1>" + height + r"px", svg)

    return svg

def main():
    if not os.path.exists("./out"):
        os.mkdir("./out")

    for file in os.listdir("."):
        if file.endswith(".svg"):
            fileBase = file[:-4]

            png_image = False

            # частично позаимствовано отсюда: https://stackoverflow.com/questions/6589358/convert-svg-to-png-in-python
            with open(file, "r") as fileObj:
                # подгоняем размер, меняя свойства width и height внутри самой SVG-шки
                fileData = svgScaleHack(fileObj.read(), 128, 128).encode("utf-8")
                #svg2png(file_obj=fileObj, write_to="out/" + fileBase + ".png")

                with wand.image.Image(blob=fileData, format="svg", background='transparent') as image:
                    #image.read(blob=fileData, format="svg")
                    #image.resize(width=1024, height=1024)  # очень медленная фукнция, при этом НЕ выдает нужного результата для векторного изображения
                    png_image = image.make_blob("png32")

                # вариант ниже у меня работает НЕ так как задумно,
                # выходной файл представляет собой svg внутри которого растровое png изображение в base64 формате, wtf?
                # это копия ответа из stackoveflow: https://stackoverflow.com/a/19718153
                    #with wand.image.Image() as image:
                    #    with wand.color.Color('transparent') as background_color:
                    #        library.MagickSetBackgroundColor(image.wand, background_color.resource)
                    #    image.read(blob=fileData, format="svg")
                    #    png_image = image.make_blob("png32")

            if png_image:
                with open("out/" + fileBase + ".png", "wb") as out:
                    out.write(png_image)
            else:
                print("Ошибка конвертирования файла " + file)

if __name__ == '__main__':
    tmp = os.getcwd()
    scriptDir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(scriptDir)

    main()

    os.chdir(tmp)
    print("Completed!")
