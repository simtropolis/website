import { Boxes, Building2, Code2, Gamepad2, Orbit, Wrench } from 'lucide-react'

const products = [
  { name: 'Copper', area: 'Rust development', state: 'Available', icon: Code2 },
  { name: 'Orbit', area: 'JVM development', state: 'Planned', icon: Orbit },
  { name: 'Forge', area: 'Game development', state: 'Planned', icon: Gamepad2 },
] as const

export function PlatformDiagram() {
  return (
    <figure className="platform-diagram" aria-labelledby="platform-diagram-title">
      <figcaption id="platform-diagram-title" className="sr-only">
        Simtropolis is the company. Made supplies shared editor and development infrastructure to
        Copper, the available Rust product, and to the planned Orbit and Forge products. Optional
        Made capabilities remain outside standard Copper releases.
      </figcaption>

      <div className="platform-diagram-company">
        <span className="platform-diagram-icon" aria-hidden="true">
          <Building2 size={18} />
        </span>
        <span>
          <b>Simtropolis</b>
          <small>Company</small>
        </span>
        <span className="platform-diagram-ref mono">ST / 01</span>
      </div>

      <div className="platform-diagram-line" aria-hidden="true" />

      <div className="platform-diagram-made">
        <div>
          <span className="platform-diagram-icon" aria-hidden="true">
            <Boxes size={18} />
          </span>
          <span>
            <b>Made</b>
            <small>Shared foundation</small>
          </span>
        </div>
        <p>Editor · language intelligence · terminal · Git · debugger · agent infrastructure</p>
      </div>

      <div className="platform-diagram-branch" aria-hidden="true" />

      <div className="platform-diagram-products">
        {products.map(({ name, area, state, icon: Icon }) => (
          <div className={`platform-diagram-product is-${state.toLowerCase()}`} key={name}>
            <span className="platform-diagram-icon" aria-hidden="true">
              <Icon size={18} />
            </span>
            <span>
              <b>{name}</b>
              <small>{area}</small>
            </span>
            <em>{state}</em>
          </div>
        ))}
      </div>

      <div className="platform-diagram-optional">
        <Wrench size={17} aria-hidden="true" />
        <span>
          <b>Separate build profiles</b>
          <small>
            Multiplayer tools and native visual tooling are opt-in Made capabilities, outside the
            standard Copper release.
          </small>
        </span>
      </div>
    </figure>
  )
}
