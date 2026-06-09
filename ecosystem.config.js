module.exports = {
  apps: [{
    name: "photodance",
    script: "node_modules/.bin/next",
    args: "start -p 80",
    cwd: "./",
    instances: 1,
    exec_mode: "fork",
    env: {
      NODE_ENV: "production",
    },
    log_date_format: "YYYY-MM-DD HH:mm:ss",
    error_file: "./logs/error.log",
    out_file: "./logs/out.log",
    merge_logs: true,
    max_memory_restart: "512M",
  }],
};
