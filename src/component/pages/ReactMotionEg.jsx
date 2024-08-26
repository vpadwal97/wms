import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const ReactMotionEg = () => {
  const [selectedId, setSelectedId] = useState(null);
  const items = [
    {
      id: "id-1",
      subtitle: "subtitle-1",
      title: "title-1",
    },
    {
      id: "id-2",
      subtitle: "subtitle-2",
      title: "title-2",
    },
    {
      id: "id-3",
      subtitle: "subtitle-3",
      title: "title-3",
    },
    {
      id: "id-4",
      subtitle: "subtitle-4",
      title: "title-4",
    },
  ];
  return (
    <>
      {items.map((item) => (
        <>
          <motion.div layoutId={item.id} onClick={() => setSelectedId(item.id)}>
            <motion.h5>{item.subtitle}</motion.h5>
            <motion.h2>{item.title}</motion.h2>
          </motion.div>
          <AnimatePresence>
            {selectedId && (
              <motion.div layoutId={selectedId}>
                <motion.h5>{item.subtitle}</motion.h5>
                {/* <motion.h2>{item.title}</motion.h2> */}
                <motion.button onClick={() => setSelectedId(null)}>
                  {item.title}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ))}
    </>
  );
};

export default ReactMotionEg;
