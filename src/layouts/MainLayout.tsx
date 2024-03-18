import { AnimatePresence, motion, useCycle } from "framer-motion";
import { ReactNode, useState } from "react";
import styles from "./MainLayout.module.css";

interface MainLayoutProps {
  mainNodes: ReactNode;
  mainOverlay: ReactNode;
  sidebarNode: ReactNode;
}

const MainLayout = ({
  mainNodes,
  mainOverlay,
  sidebarNode,
}: MainLayoutProps) => {
  const [sidebarOpen, cycleSidebarOpen] = useCycle(false, true);

  return (
    <motion.div className={styles.page_grid_container}>

      <motion.main
        className={styles.main_container}
        layout
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30,
        }}
      >
        <div className={styles.main_content}>
          <motion.div className={styles.toggle_sidebar_btn}>
            {/* <DrawPathIcon
            onTap={() => cycleSidebarOpen()}
            path={"M2.14645 11.1464C1.95118 11.3417 1.95118 11.6583 2.14645 11.8536C2.34171 12.0488 2.65829 12.0488 2.85355 11.8536L6.85355 7.85355C7.04882 7.65829 7.04882 7.34171 6.85355 7.14645L2.85355 3.14645C2.65829 2.95118 2.34171 2.95118 2.14645 3.14645C1.95118 3.34171 1.95118 3.65829 2.14645 3.85355L5.79289 7.5L2.14645 11.1464ZM8.14645 11.1464C7.95118 11.3417 7.95118 11.6583 8.14645 11.8536C8.34171 12.0488 8.65829 12.0488 8.85355 11.8536L12.8536 7.85355C13.0488 7.65829 13.0488 7.34171 12.8536 7.14645L8.85355 3.14645C8.65829 2.95118 8.34171 2.95118 8.14645 3.14645C7.95118 3.34171 7.95118 3.65829 8.14645 3.85355L11.7929 7.5L8.14645 11.1464Z"}
          /> */}
          </motion.div>
          <div className={styles.main_content_inner}>{mainNodes}</div>
          <Coverup>{mainOverlay}</Coverup>
        </div>
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              className={styles.sidepanel}
              initial={{ maxWidth: 0 }}
              animate={{ maxWidth: "100%" }}
              exit={{
                maxWidth: 0,
                transition: { delay: 0, duration: 0.3 },
              }}
            >
              {sidebarNode}
            </motion.aside>
          )}
        </AnimatePresence>
      </motion.main>


    </motion.div>
  );
};

///

const drawPath = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: ({ delay }: { delay: number }) => {
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 0.5, bounce: 0 },
        opacity: { delay, duration: 0.5 },
      },
    };
  },
};

const coverup = {
  closed: ({ delay }: { delay: number }) => {
    return {
      opacity: 0,
      width: "60px",
      height: "60px",
      transition: {
        opacity: { delay, duration: 0.5 },
        width: { delay, type: "spring", duration: 0.5, bounce: 0 },
        height: { delay, type: "spring", duration: 0.5, bounce: 0 },
      },
    };
  },
  open: ({ delay }: { delay: number }) => {
    return {
      opacity: 1,
      backgroundColor: "black",
      width: "100%",
      height: "100%",
      transition: {
        width: { delay, type: "spring", duration: 0.5, bounce: 0 },
        height: { delay, type: "spring", duration: 0.5, bounce: 0 },
        opacity: { delay, duration: 0.5 },
      },
    };
  },
};

export const exitFullscreenIconPath =
  "M2 9v1h3.293L1 14.291l.707.709L6 10.707V14h1V9H2ZM15 1.708 14.296 1 10 5.293V2H9v5h5V6h-3.293L15 1.708Z";

export const fullscreenIconPath =
  "M10 1v1h3.293L9 6.291 9.707 7 14 2.707V6h1V1h-5ZM7 9.708 6.296 9 2 13.293V10H1v5h5v-1H2.707L7 9.708Z";

const infoPath =
  "M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z";

interface EnterExitFullscreenIconProps {
  isOn: boolean;
}
export function EnterExitFullscreenIcon({
  isOn,
}: EnterExitFullscreenIconProps) {
  return (
    <motion.svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      animate="visible"
    >
      <motion.path
        d={exitFullscreenIconPath}
        variants={drawPath}
        custom={{ delay: 0 }}
        animate={isOn ? "visible" : "hidden"}
        strokeWidth={"10px"}
        strokeLinecap={"round"}
        stroke={"transparent"}
        fill="white"
      />
      <motion.path
        d={infoPath}
        variants={drawPath}
        custom={{ delay: 0 }}
        animate={!isOn ? "visible" : "hidden"}
        strokeWidth={"10px"}
        strokeLinecap={"round"}
        stroke={"transparent"}
        fill="white"
      />
    </motion.svg>
  );
}

interface CoverupProps {
  children: ReactNode;
}
const Coverup = ({ children }: CoverupProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        className={styles.modal_icon}
        onPointerDown={() => setIsOpen(!isOpen)}
      >
        {/* {isOpen ? <ExitFullscreenIcon /> : <FullscreenIcon />} */}
        <EnterExitFullscreenIcon isOn={isOpen} />
      </motion.div>
      <motion.div
        style={{ backgroundColor: "transparent" }}
        layout
        className={styles.modal}
        variants={coverup}
        custom={{ delay: 0 }}
        animate={isOpen ? "open" : "closed"}
        onPointerDown={() => setIsOpen(false)}
      >
        <motion.div
          layout
          className={styles.modal_content}
          animate={{ color: isOpen ? "white" : "transparent" }}
        >
          {children}
        </motion.div>
      </motion.div>
    </>
  );
};

export { MainLayout };
