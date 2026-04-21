# Design Brief — Attack on Titan Cinematic Archive

**Tone:** Foreboding, authoritative, immersive. Military classified archive + AAA game cinematics. Dark, tense, emotionally weighted.

**Differentiation:** Merges classified database aesthetic with narrative storytelling. Every UI element signals "restricted access" yet invites exploration.

## Color Palette

| Role | OKLCH | Hex | Usage |
|------|-------|-----|-------|
| Background Primary | 0.07 0 0 | #0a0a0a | Page base, deep immersion |
| Card/Surface | 0.12 0 0 | #191919 | Panels, elevated content |
| Primary (Blood Red) | 0.26 0.22 25 | #8b0000 | Action, alerts, emphasis |
| Accent (Gold) | 0.65 0.15 60 | #c9a227 | Survey Corps highlights |
| Foreground (White) | 0.95 0 0 | #f2f2f2 | Primary text |
| Muted Text | 0.65 0 0 | #a8a8a8 | Secondary text, labels |

## Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display | Fraunces (Serif) | 700 | Titles, hero text, cinematic captions |
| Body | Lora (Serif) | 400 | Body text, descriptions, narrative |
| Mono | JetBrains Mono | 400 | Terminal UI, data elements, military logs |

**Type Scale:** h1=3.5rem, h2=2.5rem, h3=1.75rem, body=1rem, small=0.875rem, micro=0.75rem.

## Structural Zones

| Zone | Treatment | Border |
|------|-----------|--------|
| Header/Nav | bg-primary, glass-panel blur, thin gold divider | 0.5px solid --accent |
| Hero | bg-background grain overlay + vignette, parallax depth | None |
| Content Sections | bg-card glass-panel, 1px --border, subtle glow | 1px solid --border |
| Character Cards | bg-card glass-panel, hover=glow-red, animated stats overlay | 1px solid --primary/30 |
| Terminal/Data | bg-background/80, monospace, 1px --primary, scanline effect | 1px solid --primary/40 |
| Footer | bg-secondary, dust particle effect, minimal text | 0.5px solid --border |

## Spacing & Rhythm

- **Gutters:** 2rem (mobile), 3rem (desktop)
- **Card padding:** 1.5rem
- **Component gaps:** 1rem (tight), 1.5rem (medium), 2rem (section breaks)
- **Density:** Tight, military-archive precision

## Component Patterns

- **Buttons:** Primary=blood-red gradient, Secondary=ghost outline, Text=minimal underline
- **Cards:** Glass-panel + glow-red on hover, staggered slide-up animation entry
- **Modals:** Fade-in overlay, cinematic-cut slide from top
- **Tables/Data:** Monospace terminal-text, alternating row tints (--card/0.5)
- **Alerts:** pulse-red animation, --destructive color, icon + text

## Motion & Animation

- **Page entrance:** fade-in 0.6s, then slide-up 0.8s staggered children
- **Card hover:** glow-red effect + subtle scale (1.02x)
- **Click feedback:** micro ripple, brief pulse-red
- **Transitions:** smooth 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- **Cinematic cut:** cinematic-cut 0.8s for section breaks
- **Glitch effect:** optional on terminal UI (glitch 0.4s)

## Constraints

- No vibrant colors; maintain military authority
- Grain overlay opacity max 3% (subtle texture)
- Vignette always present (visual containment)
- No rounded corners (--radius=0.25rem only on input fields)
- Text contrast AA+ minimum at all times
- All animations GPU-accelerated (will-change)

## Signature Detail

**Cinematic grain texture + vignette as constant atmospheric layer.** Reinforces "classified military aesthetic" while softening harsh black. Blood-red accent glow on interactive elements signals danger/restricted access. Gold Survey Corps highlights break visual monotony while staying thematically true.

## Accessibility

- High contrast white on deep black (0.95 L on 0.07 L)
- Monospace for data reduces cognitive load
- Animations respect `prefers-reduced-motion`
- Focus states: 2px --ring outline, --accent glow
- Color not sole indicator; icons + text always paired
