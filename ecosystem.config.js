module.exports = {
  apps: [{
    name: "streamloots",
    script: "dist/src/main.js",
    watch: true,
    wait_ready: true,
    instances: "max",
    exec_mode: "cluster",
    instance_var: 'INSTANCE_ID',
    listen_timeout: 3000,
    env: {
      NODE_ENV: "dev"
    }
  }]
}