const { exec } = require('child_process');

exec('echo $XDG_CURRENT_DESKTOP', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing command: ${error.message}`);
    return;
  }
  
  // The result is available in the stdout variable
  const desktopEnvironment = stdout.trim();
  
  // Now you can use the desktopEnvironment variable as needed
  console.log(`Current Desktop Environment: ${desktopEnvironment}`);
});
