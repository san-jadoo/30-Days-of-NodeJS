/*
Problem Statement: Create a function readFileContent(filePath) that takes the path to a file as input and 
reads its content asynchronously using the fs module. The function should print the content to the console.
*/

const fs = require('fs');

function readFileContent(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.error(`Error reading file: ${err.code} - ${err.path} not found`);
            }
        } else {
            console.log('File Content : ');
            console.log(data);
        }
    });
}

// Test Cases
readFileContent('test-files/file1.txt');
// Expected Output: Content of file1.txt

readFileContent('test-files/empty-file.txt');
// Expected Output: (empty string)

readFileContent('test-files/nonexistent-file.txt');
// Expected Output: Error reading file: ENOENT: no such file or directory...