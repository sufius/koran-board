import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory to process
const targetDir = path.join(__dirname, '../surat');

// Function to process a single file
const processFile = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Replace every 'Q' inside class attribute values with 'qlq'
    const processedContent = content.replace(
        /class=["'][^"']*Q[^"']*["']/g,
        (match) => match.replace('Q', 'qlq')
    );

    // Write the modified content back to the file
    fs.writeFileSync(filePath, processedContent, 'utf-8');
    console.log(`Processed: ${filePath}`);
};

// Function to recursively process all files in a directory
const processDirectory = (dirPath) => {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    entries.forEach((entry) => {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            processDirectory(fullPath); // Recurse into subdirectories
        } else if (entry.isFile()) {
            processFile(fullPath); // Process individual file
        }
    });
};

// Start processing
processDirectory(targetDir);
