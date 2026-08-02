# Mobalith Data Schema

## Hero

```ts
Hero
├── id
├── slug
├── name
├── title
├── roles[]
├── lanes[]
├── specialty[]
├── damageType
├── difficulty
├── tier
├── releaseDate
├── images
├── stats
├── rates
├── skills[]
├── recommendedBuilds[]
├── recommendedEmblems[]
├── recommendedSpells[]
├── counters[]
├── synergies[]
├── skins[]
└── patchHistory[]
```

---

## Item

```ts
Item
├── id
├── slug
├── name
├── category
├── price
├── image
├── stats
├── uniquePassive
├── activeSkill
└── description
```

---

## Skill

```ts
Skill
├── id
├── heroId
├── slot
├── name
├── description
├── cooldown
├── manaCost
├── icon
└── video
```

---

## Emblem

```ts
Emblem
├── id
├── slug
├── name
├── image
├── talents[]
```

---

## Spell

```ts
Spell
├── id
├── slug
├── name
├── cooldown
├── description
└── image
```

---

## Build

```ts
Build
├── id
├── heroId
├── title
├── items[]
├── emblem
├── spell
└── description
```

---

## Counter

```ts
Counter
├── heroId
├── counters[]
└── counteredBy[]
```

---

## Synergy

```ts
Synergy
├── heroId
└── heroes[]
```

---

## Patch

```ts
Patch
├── version
├── releaseDate
├── heroChanges[]
├── itemChanges[]
└── systemChanges[]
```