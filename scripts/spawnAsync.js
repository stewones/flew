const { spawn } = require('child_process');

const spawnAsync = async function (program, args, options) {
  options = (Array.isArray(args) ? options : args) || {};
  args = Array.isArray(args) ? args : [];
  const code = await new Promise((resolve, reject) => {
    const cp = spawn(program, args, options);
    cp.on('error', ex => reject(ex));
    cp.on('close', code => resolve(code));
  });
  if (code !== 0) {
    throw new Error(
      `${program}${
        args.length ? ` ${JSON.stringify(args)}` : ''
      } exited with non-zero code ${code}.`,
    );
  }
};

module.exports = {
  spawnAsync,
};
