export function AsciiScene() {
  return (
    <div className="sim-ascii" aria-hidden="true">
      <div className="sim-ascii-bar">
        <span>SIM / VISUAL TASK</span>
        <span>MADE / OPT-IN</span>
      </div>
      <pre>{`         .----[ graph ]----.
        /                  \\
  [input] -> [node] -> [model]
                  |          |
             [tensor] -> [worker]
                              |
                        [output]`}</pre>
      <div className="sim-ascii-foot">
        <span>01 DEFINE</span>
        <span>02 VALIDATE</span>
        <span>03 INSPECT</span>
      </div>
    </div>
  )
}
