const https = require("https")
const fs = require("fs")
const readline = require("readline")

function DownloadAndRead (path){
    // Завантаження файлу та запис у file.txt
    const file = fs.createWriteStream("file.txt");
    const request = https.get(path, function(response) {
    response.pipe(file);

   file.on("finish", () => {
        file.close();
        console.log("Файл успішно завантажено");

        // Зчитування файлу та підрахунок кількості рядків
        const readStream = fs.createReadStream("file.txt")
        const rl = readline.createInterface({ input: readStream })
        let counter = 0

        rl.on("line", (line) => {
        counter ++
        });
        rl.on("close", () => {
        console.log(`Кількість рядків у файлі: ${counter}`)
});
   });
});
}