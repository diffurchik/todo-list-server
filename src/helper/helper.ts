import fs from "fs";
import path from "path";


const uploadsDir = path.join(__dirname, "uploads");

export function fileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
}

export function hasFile(directory: string): boolean {
    const files = fs.readdirSync(directory);
    return files.length > 0;
}

export function deleteAllFiles(directory: string) {
    if (hasFile(directory)) {
        const files = fs.readdirSync(directory);
        files.forEach((file) => {
            deleteFile(`src/uploads/${file}`)
        });
    }
}

export function deleteFile(filePath: string): void {
    if (fileExists(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted file: ${filePath}`);
    }
}

export function getAllFilesSorted(directory: string): string[] {
    const files = fs.readdirSync(directory)
    return files
        .map((fileName) => (
            {name: fileName, time: fs.statSync(`${directory}/${fileName}`).mtime.getTime()}))
        .sort((a, b) => b.time - a.time)
        .map(file => file.name)
}