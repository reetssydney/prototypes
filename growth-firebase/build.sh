conceptPath="$1";
language="$2";
dataPath="$3";

finalPath="${conceptPath}_${language}";

rm -rf "${finalPath}"
cp -R "${conceptPath}" "${finalPath}"

# generate ejs from html
for i in `find "${finalPath}" -name "*.html"`; do
    filename=$(basename -- "$i")
    filepath=$(dirname -- "$i")
    filename="${filename%.*}"

    cp "${finalPath}/${filename}.html" "${finalPath}/${filename}.ejs"
done


for i in `find "${finalPath}" -name "*.ejs"`; do
    filename=$(basename -- "$i")
    filepath=$(dirname -- "$i")
    filename="${filename%.*}"

    ejs "${filepath}/${filename}.ejs" -f "${dataPath}" -o "${filepath}/${filename}.html"
    rm "${filepath}/${filename}.ejs"
done
