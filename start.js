module.exports = async (kernel) => {
  let script = {
    daemon: true,
    run: [{
      method: "shell.run",
      params: {
        path: "app",
        venv: "env",
        env: {
          PYTORCH_ENABLE_MPS_FALLBACK: 1
        },
        message: [
          "python app.py",
        ],
        on: [{ "event": "/http:\/\/[0-9.:]+/", "done": true }]
      }
    }, {
      "method": "local.set",
      "params": {
        "url": "{{input.event[0]}}"
      }
    }, {
      "method": "proxy.start",
      "params": {
        "uri": "{{local.url}}",
        "name": "Local Sharing"
      }
    }]
  }
  return script
}
