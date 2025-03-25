import { LiveButton } from "./live-button"
import { MicButton } from "./mic-button"

export const Controls = () => {
    return (
        <div className="controls-panels">
            <MicButton />
            <LiveButton />
        </div>
    )
}