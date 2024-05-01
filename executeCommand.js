const { exec } = require('child_process');

function executeCommand(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`${error.message}`);
            return;
        }

        console.log('Command Output:');
        console.log(stdout);

        if (stderr) {
            console.error(`${stderr}`);
        }    });
}

executeCommand('dir');
executeCommand('echo "Hello, Node.js!"');
