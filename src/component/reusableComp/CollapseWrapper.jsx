import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { useNavigate } from "react-router-dom";

const CollapseWrapper = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  const handleCollapse = () => {
    setOpen(!open);
    props.msetIsOpen(true);
    if (props.btnLink) {
      navigate(props.btnLink);
    }
  };

  useEffect(() => {
    if (!props.mIsOpen) {
      setOpen(false);
    }
  }, [props.mIsOpen]);

  
  useImperativeHandle(ref, () => ({
    triggerFunction: () => {
      console.log("ssss");

      setOpen(false);
    },
  }));
  return (
    <div ref={wrapperRef}>
      <Button
        variant={props.buttonVariant}
        className={`${open ? "active" : ""} ${props.buttonClass}`}
        // onClick={() => setOpen(!open)}
        onClick={handleCollapse}
        aria-expanded={open}
      >
        {props.buttonLabel || ""}
      </Button>
      <Collapse in={open}>
        <div className={props.collapseClass}>{props.collapseBody || ""}</div>
      </Collapse>
    </div>
  );
});

export default CollapseWrapper;
