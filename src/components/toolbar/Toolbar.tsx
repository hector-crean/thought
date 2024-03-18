import PencilButton from "./PencilButton";

import SelectionButton from "./SelectionButton";
import styles from "./Toolbar.module.css";
import { CanvasMode, CanvasState } from "./types";

type Props = {
    canvasState: CanvasState;
    setCanvasState: (newState: CanvasState) => void;

};

export default function ToolsBar(
    { canvasState, setCanvasState, }: Props
) {
    return (
        <div className={styles.tools_panel_container}>
            <div className={styles.tools_panel}>
                <div className={styles.tools_panel_section}>
                    <SelectionButton
                        isActive={
                            canvasState.mode === CanvasMode.None ||
                            canvasState.mode === CanvasMode.Translating ||
                            canvasState.mode === CanvasMode.SelectionNet ||
                            canvasState.mode === CanvasMode.Pressing ||
                            canvasState.mode === CanvasMode.Resizing
                        }
                        onClick={() => setCanvasState({ mode: CanvasMode.None })}
                    />
                    <PencilButton
                        isActive={canvasState.mode === CanvasMode.Pencil}
                        onClick={() => setCanvasState({ mode: CanvasMode.Pencil })}
                    />

                </div>
                <div className={styles.seperator}></div>
                <div className={styles.tools_panel_section}>

                </div>
            </div>
        </div>
    );
}
