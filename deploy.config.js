module.exports = {
  apps: [
    {
      name: "JCWD-0108-03",
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 8000,
      },
      time: true,
    },
  ],
};
