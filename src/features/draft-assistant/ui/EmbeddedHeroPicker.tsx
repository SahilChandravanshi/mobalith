export function EmbeddedHeroPicker() {
  return (
    <div
      className="
        angular-frame
        border
        border-ink/10
        bg-elevated
        p-6
      "
    >
      <div className="space-y-4">

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">
            Hero Picker
          </h2>

          <span className="text-sm text-muted">
            Select a slot
          </span>
        </div>

        <div
          className="
            h-[600px]
            rounded
            border
            border-dashed
            border-ink/20
            flex
            items-center
            justify-center
            text-muted
          "
        >
          Hero Grid will be here
        </div>

      </div>
    </div>
  )
}